import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useRootStore } from 'src/store/root';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';
import { DASHBOARD } from 'src/utils/mixPanelEvents';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';

export const BorrowAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  stableBorrowRate,
  sIncentivesData,
  vIncentivesData,
  underlyingAsset,
}: // isFreezed,
DashboardReserve) => {
  const { openBorrow } = useModalContext();
  const { currentMarket } = useProtocolDataContext();

  // const disableBorrow = isFreezed || Number(availableBorrows) <= 0;

  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={underlyingAsset}
      data-cy={`dashboardBorrowListItem_${symbol.toUpperCase()}`}
      currentMarket={currentMarket}
    >
      <ListValueColumn
        symbol={symbol}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        withTooltip={false}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />
      <ListAPRColumn
        value={Number(variableBorrowRate)}
        incentives={vIncentivesData}
        symbol={symbol}
      />
      <ListAPRColumn
        value={Number(stableBorrowRate)}
        incentives={sIncentivesData}
        symbol={symbol}
      />
      <ListButtonsColumn>
        <Button
          // disabled={disableBorrow}
          // variant="contained"
          onClick={() => {
            openBorrow(underlyingAsset, currentMarket, name, 'dashboard');
          }}
          sx={(theme) => ({
            borderRadius: '20px',
            border: '1px solid #000000',
            background: theme.palette.mode === 'dark' ? '#FFFF' : '#FFF',
            color: theme.palette.mode === 'dark' ? '#000' : '#000',
            '&:hover': {
              background: theme.palette.mode === 'dark' ? '#FFFF' : '#FFF',
            },
          })}
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          // variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
          onClick={() => {
            trackEvent(DASHBOARD.DETAILS_NAVIGATION, {
              type: 'Button',
              market: currentMarket,
              assetName: name,
              asset: underlyingAsset,
            });
          }}
          sx={(theme) => ({
            borderRadius: '20px',
            border: '1px solid #000000',
            background: theme.palette.mode === 'dark' ? '#FFFF' : '#FFF',
            color: theme.palette.mode === 'dark' ? '#000' : '#000',
            '&:hover': {
              background: theme.palette.mode === 'dark' ? '#FFFF' : '#FFF',
            },
          })}
        >
          <Trans>Details</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
