import type {
  animationTypes,
  easingTypes,
  triggerTypes,
} from "@synoem/payload/fields/animation";

export type AnimationType =
  (typeof animationTypes)[keyof typeof animationTypes];
export type EasingType = (typeof easingTypes)[keyof typeof easingTypes];
export type TriggerType = (typeof triggerTypes)[keyof typeof triggerTypes];

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export type AnimationValues = {
  position?: {
    from: Vector3;
    to: Vector3;
  };
  rotation?: {
    from: Vector3;
    to: Vector3;
  };
  scale?: {
    from: number;
    to: number;
  };
};

export type ScrollSettings = {
  start: string;
  end: string;
  scrub: boolean;
};

export type Animation = {
  type: AnimationType;
  trigger: TriggerType;
  easing: EasingType;
  duration: number;
  delay: number;
  values: AnimationValues;
  scrollSettings?: ScrollSettings;
};
