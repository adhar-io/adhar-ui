/**
 * Builder Data Layer — API Integration, Data Binding, and Code Generation
 *
 * Enables visual API binding:
 *   1. Define data sources (REST endpoints)
 *   2. Map response fields to UI element props
 *   3. Generate production code with fetch/hooks
 */

// ─── Types ───────────────────────────────────────────────────────────────────
export interface DataSource {
  id: string;
  name: string;
  type: 'rest' | 'graphql';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: string;
  authType: 'none' | 'bearer' | 'api-key' | 'basic';
  authValue: string;
  responseFields: ResponseField[];
  sampleResponse?: string;
  lastTested?: number;
  status?: 'untested' | 'success' | 'error';
}

export interface ResponseField {
  path: string;       // e.g. "data.users[0].name"
  type: string;       // string, number, boolean, array, object
  label: string;      // Human readable
  sampleValue?: any;
}

export interface DataBinding {
  id: string;
  nodeId: string;         // Which canvas node
  prop: string;           // Which prop (children, placeholder, className, etc.)
  sourceId: string;       // Which data source
  fieldPath: string;      // Which response field
  transform?: string;     // Optional JS transform: (value) => ...
}

// ─── Test API Endpoint ───────────────────────────────────────────────────────
export async function testDataSource(ds: DataSource): Promise<{ success: boolean; data?: any; error?: string; fields?: ResponseField[] }> {
  try {
    const headers: Record<string, string> = { ...ds.headers };
    if (ds.authType === 'bearer') headers['Authorization'] = `Bearer ${ds.authValue}`;
    if (ds.authType === 'api-key') headers['X-API-Key'] = ds.authValue;
    if (ds.authType === 'basic') headers['Authorization'] = `Basic ${btoa(ds.authValue)}`;
    if (ds.method !== 'GET' && ds.body) headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    const response = await fetch(ds.url, {
      method: ds.method,
      headers,
      body: ds.method !== 'GET' ? ds.body : undefined,
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    const fields = extractFields(data);
    return { success: true, data, fields };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

// ─── Extract fields from JSON response ──────────────────────────────────────
function extractFields(obj: any, prefix = '', depth = 0): ResponseField[] {
  if (depth > 4) return [];
  const fields: ResponseField[] = [];

  if (Array.isArray(obj)) {
    fields.push({ path: prefix || 'root', type: 'array', label: prefix || 'Array', sampleValue: `[${obj.length} items]` });
    if (obj.length > 0 && typeof obj[0] === 'object') {
      fields.push(...extractFields(obj[0], `${prefix}[0]`, depth + 1));
    }
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(value)) {
        fields.push({ path, type: 'array', label: key, sampleValue: `[${value.length} items]` });
        if (value.length > 0 && typeof value[0] === 'object') {
          fields.push(...extractFields(value[0], `${path}[0]`, depth + 1));
        }
      } else if (value && typeof value === 'object') {
        fields.push({ path, type: 'object', label: key, sampleValue: '{...}' });
        fields.push(...extractFields(value, path, depth + 1));
      } else {
        fields.push({ path, type: typeof value, label: key, sampleValue: value });
      }
    });
  }

  return fields;
}

// ─── Generate Code with Data Fetching ────────────────────────────────────────
export function generateDataCode(
  dataSources: DataSource[],
  bindings: DataBinding[],
  framework: string,
): string {
  if (dataSources.length === 0) return '';

  const hooks: string[] = [];
  const fetches: string[] = [];
  const stateVars: string[] = [];

  dataSources.forEach((ds) => {
    const varName = ds.name.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, (c) => c.toLowerCase());
    const hookName = `use${ds.name.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, (c) => c.toUpperCase())}`;

    if (framework === 'react') {
      stateVars.push(`const [${varName}, set${varName.charAt(0).toUpperCase() + varName.slice(1)}] = useState<any>(null)`);
      stateVars.push(`const [${varName}Loading, set${varName}Loading] = useState(true)`);
      stateVars.push(`const [${varName}Error, set${varName}Error] = useState<string | null>(null)`);

      const headers = Object.entries(ds.headers).map(([k, v]) => `"${k}": "${v}"`).join(', ');
      const authHeader = ds.authType === 'bearer' ? `, "Authorization": "Bearer ${ds.authValue}"` : ds.authType === 'api-key' ? `, "X-API-Key": "${ds.authValue}"` : '';

      fetches.push(`
  // Fetch ${ds.name}
  useEffect(() => {
    async function fetch${varName.charAt(0).toUpperCase() + varName.slice(1)}() {
      try {
        set${varName}Loading(true)
        const res = await fetch("${ds.url}", {
          method: "${ds.method}",
          headers: { ${headers}${authHeader} }${ds.method !== 'GET' && ds.body ? `,\n          body: JSON.stringify(${ds.body})` : ''}
        })
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const data = await res.json()
        set${varName.charAt(0).toUpperCase() + varName.slice(1)}(data)
      } catch (e) {
        set${varName}Error((e as Error).message)
      } finally {
        set${varName}Loading(false)
      }
    }
    fetch${varName.charAt(0).toUpperCase() + varName.slice(1)}()
  }, [])`);
    }
  });

  return framework === 'react'
    ? `import { useState, useEffect } from "react"\n\n${stateVars.join('\n  ')}\n${fetches.join('\n')}`
    : `// Data fetching for ${framework}\n// TODO: Implement for ${framework}`;
}

// ─── Generate binding expressions ────────────────────────────────────────────
export function getBindingExpression(binding: DataBinding, dataSources: DataSource[]): string {
  const ds = dataSources.find((d) => d.id === binding.sourceId);
  if (!ds) return '""';
  const varName = ds.name.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, (c) => c.toLowerCase());
  const access = binding.fieldPath.replace(/\[(\d+)\]/g, '[$1]');
  const expr = `${varName}?.${access}`;
  return binding.transform ? `(${binding.transform})(${expr})` : expr;
}

// ─── Sample Data Sources for Demo ────────────────────────────────────────────
export const sampleDataSources: DataSource[] = [
  {
    id: 'ds-users',
    name: 'Users',
    type: 'rest',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: {},
    authType: 'none',
    authValue: '',
    status: 'untested',
    responseFields: [
      { path: '[0].id', type: 'number', label: 'ID', sampleValue: 1 },
      { path: '[0].name', type: 'string', label: 'Name', sampleValue: 'Leanne Graham' },
      { path: '[0].email', type: 'string', label: 'Email', sampleValue: 'leanne@example.com' },
      { path: '[0].company.name', type: 'string', label: 'Company', sampleValue: 'Romaguera-Crona' },
    ],
  },
  {
    id: 'ds-posts',
    name: 'Posts',
    type: 'rest',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    headers: {},
    authType: 'none',
    authValue: '',
    status: 'untested',
    responseFields: [
      { path: '[0].id', type: 'number', label: 'ID', sampleValue: 1 },
      { path: '[0].title', type: 'string', label: 'Title', sampleValue: 'sunt aut facere...' },
      { path: '[0].body', type: 'string', label: 'Body', sampleValue: 'quia et suscipit...' },
      { path: '[0].userId', type: 'number', label: 'User ID', sampleValue: 1 },
    ],
  },
];
