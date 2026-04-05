// @ts-nocheck
import { useLocalProxy } from '../../../../runtime.ts';
'use client';
import * as React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

function Avatar(props: AvatarProps) {
  const state = useLocalProxy({ showImage: null, handleError: null });

  return (
    <span role='img' aria-label={props.alt} className={props.className}>
      {state.showImage
        ? (
          <img
            src={props.src}
            alt={props.alt || ''}
            onError={(event) => state.handleError()}
            className={props.imageClass}
          />
        )
        : (
          <span aria-hidden='true' className={props.fallbackClass}>
            {props.fallback || '?'}
          </span>
        )}
    </span>
  );
}

export default Avatar;
