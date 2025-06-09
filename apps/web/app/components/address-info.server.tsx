import type { Locale } from "@synoem/config";
import type { Addresses } from "@synoem/types";

interface Props {
  address: Addresses[number];
  locale: Locale;
}

export const AddressInfo = ({ address, locale }: Props) => {
  if (locale === "de") {
    return (
      <address>
        <div>{address.line1}</div>
        {address.line2 && <div>{address.line2}</div>}
        <div>
          {address.zip} {address.city}
        </div>
        <div>{address.country}</div>
      </address>
    );
  }

  return (
    <address>
      <div>{address.line1}</div>
      {address.line2 && <div>{address.line2}</div>}
      <div>
        {address.city}
        {address.state && `, ${address.state}`} {address.zip}
      </div>
      <div>{address.country}</div>
    </address>
  );
};
