import { useMemo, forwardRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Payment from '@material-ui/icons/Payment';
import createSvgIcon from '@material-ui/core/utils/createSvgIcon';
import { Link, useParams } from 'react-router-dom';
import { BusinessParams } from '../data/business';
import { AccountInfo } from '../data/account';
import { formatMoney } from '../data/money';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Savings = createSvgIcon(
  <path d="M19.83,7.5l-2.27-2.27c0.07-0.42,0.18-0.81,0.32-1.15C17.96,3.9,18,3.71,18,3.5C18,2.67,17.33,2,16.5,2 c-1.64,0-3.09,0.79-4,2l-5,0C4.46,4,2,6.46,2,9.5S4.5,21,4.5,21l5.5,0v-2h2v2l5.5,0l1.68-5.59L22,14.47V7.5H19.83z M13,9H8V7h5V9z M16,11c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C17,10.55,16.55,11,16,11z" />,
  'Savings'
);

export default function AccountLink({ account }: { account: AccountInfo }) {
  const styles = useAccountLinkStyles();
  const { siren, accountId } = useParams<BusinessParams>();
  const url = `/business/${siren}/account/${account.account_id}`;

  const CustomLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement>((linkProps, ref) => (
        <Link ref={ref} to={url} {...linkProps} />
      )),
    [url]
  );

  const last4 = account.account_number.slice(-4);

  return (
    <ListItem>
      <Button
        variant={accountId === account.account_id ? 'contained' : 'text'}
        component={CustomLink}
        color={accountId === account.account_id ? 'primary' : 'default'}
        className={styles.button}
        aria-label={`account ending in ${last4}`}
      >
        <ListItemIcon>
          {account.account_type === 'TRANSACTION' ? <Payment /> : <Savings />}
        </ListItemIcon>
        <ListItemText>&hellip;{last4}</ListItemText>
        <ListItemText className={styles.amount}>
          {formatMoney(account.current, account.currency)}
        </ListItemText>
      </Button>
    </ListItem>
  );
}

const useAccountLinkStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      flexGrow: 1,
    },
    amount: {
      textAlign: 'right',
    },
  })
);
