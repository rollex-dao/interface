import { ChainId } from '@pollum-io/contract-helpers';

import { getProvider } from '../marketsAndNetworksConfig';
import { RotationProvider } from '../rotationProvider';

it('should use a RotationProvider when there are multiple rpc urls configured for a network', () => {
  const provider = getProvider(570 as ChainId);
  expect(provider).instanceOf(RotationProvider);
});
