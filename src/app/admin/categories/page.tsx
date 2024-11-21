import { getCategoriesWithProducts } from "@/actions/categories";

export default async function Categories() {
    const categories = await getCategoriesWithProducts();
    console.log(categories);
    
    return <>Categories</>
}