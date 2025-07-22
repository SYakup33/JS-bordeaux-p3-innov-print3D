import {
  CheckCircleFill,
  HourglassSplit,
  Truck,
  XCircleFill,
} from "react-bootstrap-icons";

export const statuss = ["en préparation", "expédiée", "livrée", "annulée"];

export const statusClass = (status: string) => {
  if (status.includes("en préparation")) return "status-en-preparation";
  if (status.includes("expédiée")) return "status-expediee";
  if (status.includes("livrée")) return "status-livree";
  if (status.includes("annulée")) return "status-annulee";
  return "status-en-preparation";
};

export const StatusIcons = ({ status }: { status: string }) => {
  return (
    <div className="border rounded-pill fw-bold py-2 px-3 text-center d-flex align-items-center gap-1">
      {status === "livrée" && <CheckCircleFill />}
      {status === "en préparation" && <HourglassSplit />}
      {status === "expédiée" && <Truck />}
      {status === "annulée" && <XCircleFill />}
      {status}
    </div>
  );
};
