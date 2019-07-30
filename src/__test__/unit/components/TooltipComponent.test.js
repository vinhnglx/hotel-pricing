import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TooltipComponent from '../../../components/TooltipComponent';

afterEach(cleanup);

describe('TooltipComponent', () => {
  it('returns title and iconType', () => {
    const { getByTestId } = render(
      <TooltipComponent title="Hello World" iconType="question" />
    );
    expect(getByTestId('tooltip')).toBeDefined();
  });
});
