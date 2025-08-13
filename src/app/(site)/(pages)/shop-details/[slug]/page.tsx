import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { getProductBySlug } from "@/lib/sanity-api";
import { notFound } from "next/navigation";

interface ShopDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ShopDetailsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | NextCommerce`,
    description: product.description || `Shop ${product.title} at NextCommerce`,
  };
}

const ShopDetailsPage = async ({ params }: ShopDetailsPageProps) => {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
};

export default ShopDetailsPage;
