// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AvatarProps {
  src?: string;
  /** Person’s name / image description. Also used to derive fallback initials. */
  alt?: string;
  /** Fallback content while loading or when the image fails (default: initials from `alt`) */
  fallback?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

import { cn } from "@adhar-ui/utils";
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "./avatar.styles.ts";
import { initials } from "../_internal/dom.ts";

@Component({
  selector: "adhar-avatar",
  template: `
    <span
      [attr.role]="showImage && imageLoaded ? undefined : 'img'"
      [attr.aria-label]="showImage && imageLoaded ? undefined : alt"
      [class]="classes"
      ><ng-container *ngIf="showImage"
        ><img
          #imgRef
          [attr.src]="src"
          [attr.alt]="alt || ''"
          (load)="handleLoad()"
          (error)="handleError()"
          [class]="imageClasses"
      /></ng-container>
      <ng-container *ngIf="!imageLoaded"
        ><span
          aria-hidden="true"
          [class]="fallbackClasses"
          >{{fallbackText}}</span
        ></ng-container
      ></span
    >
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export default class Avatar {
  @Input() src!: AvatarProps["src"];
  @Input() fallback!: AvatarProps["fallback"];
  @Input() alt!: AvatarProps["alt"];
  @Input() size!: AvatarProps["size"];
  @Input() shape!: AvatarProps["shape"];
  @Input() className!: AvatarProps["className"];
  @Input() imageClass!: AvatarProps["imageClass"];
  @Input() fallbackClass!: AvatarProps["fallbackClass"];

  @ViewChild("imgRef") imgRef!: ElementRef;

  imageError = false;
  imageLoaded = false;
  lastSrc = "";
  get showImage() {
    return !!this.src && !this.imageError;
  }
  get fallbackText() {
    return this.fallback || initials(this.alt) || "?";
  }
  get classes() {
    return cn(
      avatarVariants({
        size: this.size,
        shape: this.shape,
      }),
      this.className
    );
  }
  get imageClasses() {
    return cn(
      avatarImageVariants(),
      this.imageLoaded ? "" : "invisible absolute inset-0",
      this.imageClass
    );
  }
  get fallbackClasses() {
    return cn(
      avatarFallbackVariants({
        size: this.size,
      }),
      this.fallbackClass
    );
  }
  handleLoad() {
    this.imageLoaded = true;
  }
  handleError() {
    this.imageError = true;
  }

  ngOnInit() {
    this.lastSrc = this.src || "";

    if (typeof window !== "undefined") {
      /* An image served from cache can finish before hydration attaches onLoad. */
      if (
        this.imgRef?.nativeElement &&
        this.imgRef?.nativeElement.complete &&
        this.imgRef?.nativeElement.naturalWidth > 0
      )
        this.imageLoaded = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      /* Only reset when the source actually changes (this also runs on mount). */
      if ((this.src || "") === this.lastSrc) return;
      this.lastSrc = this.src || "";
      this.imageError = false;
      this.imageLoaded = false;
    }
  }
}
