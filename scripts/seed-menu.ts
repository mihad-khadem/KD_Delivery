import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config({ path: ".env.local" });

async function seedMenu() {
  const mongoose = await import("mongoose");
  const { connectDB } = await import("../lib/mongodb");
  const { menuItems, categories } = await import("../public/data/menu");
  const Category = (await import("../models/Category")).default;
  const Product = (await import("../models/Product")).default;

  try {
    await connectDB();

    console.log("Connected to MongoDB.");
    console.log("Seeding categories...");

    const categoryIds: Types.ObjectId[] = [];

    for (const [index, name] of categories.entries()) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const category = await Category.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            isActive: true,
            sortOrder: index,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );

      if (!category) {
        throw new Error(`Failed to create category: ${name}`);
      }

      categoryIds.set(name, category._id);
    }

    console.log(`Seeded ${categoryIds.size} categories.`);
    console.log("Seeding products...");

    for (const [index, item] of menuItems.entries()) {
      const categoryId = categoryIds.get(item.category);

      if (!categoryId) {
        throw new Error(
          `Category "${item.category}" not found for "${item.name}".`,
        );
      }

      await Product.findOneAndUpdate(
        { menuItemId: item.id },
        {
          $set: {
            menuItemId: item.id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: item.image,
            category: categoryId,
            prices: {
              one: item.prices.one,
              ...(item.prices.three !== undefined
                ? { three: item.prices.three }
                : {}),
              ...(item.prices.five !== undefined
                ? { five: item.prices.five }
                : {}),
            },
            isAvailable: true,
            sortOrder: index,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log(`Successfully seeded ${menuItems.length} products.`);
    console.log("Menu seeding completed!");
  } catch (error) {
    console.error("Menu seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

seedMenu();
