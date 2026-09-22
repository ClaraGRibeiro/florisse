"use client";

import { formatFreightPrice, useFreightEstimate } from "@/hooks/useFreight";
import { FaMapMarkerAlt, FaTruck } from "react-icons/fa";

type FreightBadgeProps = {
  weight: number;
  width: number;
  length: number;
  height: number;
  compact?: boolean;
};

export default function FreightBadge({
  weight,
  width,
  length,
  height,
  compact = false,
}: FreightBadgeProps) {
  const { cep, estimate, loading } = useFreightEstimate({
    weight,
    width,
    length,
    height,
  });

  if (!cep) {
    return (
      <p className="text-muted flex items-center gap-1.5 text-xs">
        <FaMapMarkerAlt className="shrink-0" size={11} />
        Defina seu CEP para ver o frete{" "}
        <span className="font-semibold">aproximado</span>
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-muted flex items-center gap-1.5 text-xs">
        <FaTruck className="shrink-0" size={11} />
        Calculando frete <span className="font-semibold">
          aproximado
        </span> para {cep.slice(0, 5)}-{cep.slice(5)}...
      </p>
    );
  }

  if (!estimate) {
    return (
      <p className="text-muted flex items-center gap-1.5 text-xs">
        <FaTruck className="shrink-0" size={11} />
        Frete indisponível para este CEP
      </p>
    );
  }

  return (
    <div className={compact ? "text-xs" : "text-sm"}>
      <p className="text-foreground flex items-center gap-1.5 font-medium">
        <FaTruck className="text-primary shrink-0" size={11} />
        Frete <span className="font-semibold">aproximado</span>{" "}
        {formatFreightPrice(estimate.price)}
      </p>

      <p className="text-muted mt-0.5">
        {estimate.serviceName}
        {estimate.deadline ? ` · ${estimate.deadline}` : ""}
        {" · CEP "}
        {cep.slice(0, 5)}-{cep.slice(5)}
      </p>
    </div>
  );
}
