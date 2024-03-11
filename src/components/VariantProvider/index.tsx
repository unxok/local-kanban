import { createContext, useContext, useState } from "react";

export type Variant = "default" | "retro" | "modernRetro" | "glassy" | "neon";

type VariantProviderProps = {
  children: React.ReactNode;
  defaultVariant: Variant;
  storageKey?: string;
};

type VariantProviderState = {
  variant: Variant;
  setVariant: (v: Variant) => void;
};

const initialVariant: VariantProviderState = {
  variant: "default",
  setVariant: () => null,
};

const VariantContext = createContext<VariantProviderState>(initialVariant);

export const VariantProvider = ({
  children,
  defaultVariant = "default",
  storageKey = "variant",
  ...props
}: VariantProviderProps) => {
  const [variant, setVariant] = useState<Variant>(
    () => (localStorage.getItem(storageKey) as Variant) || defaultVariant,
  );

  const value = {
    variant,
    setVariant: (variant: Variant) => {
      localStorage.setItem(storageKey, variant);
      setVariant(variant);
    },
  };

  return (
    <VariantContext.Provider {...props} value={value}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const context = useContext(VariantContext);

  if (context === undefined) {
    throw new Error("useVariant myst be used within a VariantProvider");
  }

  return context;
};
