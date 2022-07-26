import { ReactWrapper } from 'enzyme';
import * as sinon from 'sinon';
/**
 * Replaces the enzyme render function with a spy that can be used to count how many
 * times the render function was called in a test.
 * @param wrapper - The wrapper around the component instance for which you want to spy upon
 */
export declare function setRenderSpy(wrapper: ReactWrapper<{}, {}>): sinon.SinonSpy;
