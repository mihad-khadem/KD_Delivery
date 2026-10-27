export type DeliveryZone = {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "zone-1",
    name: "Zone 1 — Nearby",
    fee: 80,
    estimatedTime: "30–45 minutes",
  },
  {
    id: "zone-2",
    name: "Zone 2 — Standard",
    fee: 130,
    estimatedTime: "45–60 minutes",
  },
  {
    id: "zone-3",
    name: "Zone 3 — Extended",
    fee: 80,
    estimatedTime: "60–90 minutes",
  },
];

export const RESTAURANT_PICKUP_TIME = "15–25 minutes";

export function getDeliveryFee(
  method: "delivery" | "pickup",
  zoneId: string,
): number {
  if (method === "pickup") return 0;

  return DELIVERY_ZONES.find((zone) => zone.id === zoneId)?.fee ?? 0;
}
