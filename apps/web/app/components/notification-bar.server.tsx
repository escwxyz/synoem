import { unstable_cache } from "next/cache";
import { Button } from "@synoem/ui/components/button";
import type { Locale } from "@synoem/config";
import { Suspense } from "react";
import { getNotification } from "~/data/get-notification";

export const NotificationBar = ({ locale }: { locale: Locale }) => {
  return (
    <Suspense fallback={<NotificationBarSkeleton />}>
      <NotificationBarInner locale={locale} />
    </Suspense>
  );
};

const NotificationBarInner = async ({ locale }: { locale: Locale }) => {
  const notificationResponse = await getNotificationCached(locale)();

  if (notificationResponse.status === "success" && notificationResponse.data) {
    return <div>Something went wrong</div>;
  }

  const notification = notificationResponse.data;

  return (
    <>
      {notification && (
        <div className="flex items-center justify-between bg-primary text-primary-foreground h-6 w-full">
          <p>{notification?.title}</p>
          <Button variant="outline" size="sm">
            {notification?.link && <p>Click here</p>}
          </Button>
        </div>
      )}
    </>
  );
};

const NotificationBarSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-8 bg-primary text-primary-foreground h-4 w-full">
      <div className="w-1/2 h-4 bg-gray-200 rounded-full" />
    </div>
  );
};

const getNotificationCached = (locale: Locale) => {
  return unstable_cache(
    async () => {
      return await getNotification({ locale });
    },
    ["notification-bar"],
    {},
  );
};
