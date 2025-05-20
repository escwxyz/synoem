"use client";

import type { SolarPanel, PumpController } from "@synoem/types";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@synoem/ui/components/tabs";
import { useTranslations } from "next-intl";
import { SolarPanelWarrantyTab } from "./solar-panel-warranty-tab";
import { ProductOverviewTab } from "./product-overview-tab";
import { SolarPanelSpecificationsTab } from "./solar-panel-specs-tab";
import { PumpControllerSpecificationsTab } from "./pump-controller-specs-tab";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import type { ProductTypeId } from "@synoem/config";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@synoem/ui/components/accordion";

interface Props {
  productTypeId: ProductTypeId;
  product: SolarPanel | PumpController;
}

export const ProductTabs = ({ productTypeId, product }: Props) => {
  const t = useTranslations("ProductTabs");

  const hasWarranty = product.warranty;

  const tabs: { value: string; labelKey: string }[] = [
    {
      value: "overview",
      labelKey: "overview",
    },
    {
      value: "specifications",
      labelKey: "specifications",
    },
  ];

  if (productTypeId === "solar-panel") {
    if (hasWarranty) {
      tabs.push({
        value: "warranty",
        labelKey: "warranty",
      });
    }

    tabs.push({
      value: "documents",
      labelKey: "documents",
    });
  }

  const isMobile = useIsMobile();

  return (
    <section className="mt-4">
      {isMobile ? (
        <Accordion type="single" defaultValue={tabs[0]?.value}>
          {tabs.map((tab) => {
            return (
              <AccordionItem key={tab.value} value={tab.value}>
                <AccordionTrigger>{t(tab.labelKey)}</AccordionTrigger>
                <AccordionContent>
                  {tab.value === "overview" && <ProductOverviewTab product={product} />}
                  {tab.value === "specifications" && (
                    <>
                      {productTypeId === "solar-panel" && (
                        <SolarPanelSpecificationsTab solarPanel={product as SolarPanel} />
                      )}
                      {productTypeId === "pump-controller" && (
                        <PumpControllerSpecificationsTab
                          pumpController={product as PumpController}
                        />
                      )}
                    </>
                  )}
                  {tab.value === "warranty" && hasWarranty && productTypeId === "solar-panel" && (
                    <SolarPanelWarrantyTab solarPanel={product as SolarPanel} />
                  )}
                  {tab.value === "documents" && productTypeId === "solar-panel" && (
                    <div>Documents</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <Tabs defaultValue={tabs[0]?.value} className="flex flex-col gap-4">
          <TabsList className="overflow-x-auto bg-muted text-muted-foreground inline-flex w-full items-center justify-center rounded-md p-1 min-h-12">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {t(tab.labelKey)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="overview">
            <ProductOverviewTab product={product} />
          </TabsContent>

          <TabsContent value="specifications">
            {productTypeId === "solar-panel" && (
              <SolarPanelSpecificationsTab solarPanel={product as SolarPanel} />
            )}
            {productTypeId === "pump-controller" && (
              <PumpControllerSpecificationsTab pumpController={product as PumpController} />
            )}
          </TabsContent>

          {productTypeId === "solar-panel" && hasWarranty && (
            <>
              <TabsContent value="warranty">
                <SolarPanelWarrantyTab solarPanel={product as SolarPanel} />
              </TabsContent>

              <TabsContent value="documents">
                <div>Documents</div>
              </TabsContent>
            </>
          )}
        </Tabs>
      )}
    </section>
  );
};
