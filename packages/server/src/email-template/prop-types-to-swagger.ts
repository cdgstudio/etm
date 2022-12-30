import { ApiPropertyOptions } from '@nestjs/swagger';
import * as PropTypes from 'prop-types';

export function getApiPropertyOptions(
  fn: {
    propTypes?: Record<string, unknown>;
    defaultProps?: Record<string, unknown>;
  },
  key: string
): ApiPropertyOptions | null {
  if (key === 'children') {
    return null;
  }

  const prop = fn.propTypes?.[key];
  const example = fn.defaultProps?.[key] ?? undefined;

  if (prop === PropTypes.string) {
    return {
      required: false,
      type: String,
      example,
    };
  }
  if (prop === PropTypes.string.isRequired) {
    return {
      required: true,
      type: String,
      example,
    };
  }
  if (prop === PropTypes.bool) {
    return {
      required: false,
      type: Boolean,
      example,
    };
  }
  if (prop === PropTypes.bool.isRequired) {
    return {
      required: true,
      type: Boolean,
      example,
    };
  }
  if (prop === PropTypes.number) {
    return {
      required: false,
      type: Number,
      example,
    };
  }
  if (prop === PropTypes.number.isRequired) {
    return {
      required: true,
      type: Number,
      example,
    };
  }
  return {
    required: false,
    type: String,
    example,
  };
}
