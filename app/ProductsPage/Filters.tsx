"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategorie, setSelectedCollection, setPriceRange } from "../Redux/Slices/filtersSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { Product } from "@/app/Types/Types";

interface FilterProps {
  onChange?: (filters: Record<string, string>) => void;
  products?: Product[];
  categories?: string[];
}

export function Filter({ onChange, products = []}: FilterProps) {
  const filters = useSelector((state: RootState) => state.filters);

  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('filters');

  // Extract unique collections from products
  const collectionsSet = useMemo(() => {
    const collections = products
      .map((p) => p.collection)
      .filter((c): c is string => Boolean(c));
    return Array.from(new Set(collections)).sort();
  }, [products]);
  
  const [categoriesSet, setCategoriesSet] = useState<string[]>([]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const getCategoryLabel = (cat: string): string => {
    const key = cat.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const names: Record<string, string> = {
      tshirt: t('categoryNames.tshirt'),
      hoodie: t('categoryNames.hoodie'),
      jersey: t('categoryNames.jersey'),
    };
    return names[key] ?? cat;
  };


  const onCollectionChange = (col: string) => {
    dispatch(setSelectedCollection(col));
    if (col === 'all') {
      onChange?.({ collection: '', isFeatured: '' });
    } else if (col === 'trending') {
      onChange?.({ collection: '', isFeatured: 'true' });
    } else {
      onChange?.({ collection: col, isFeatured: '' });
    }
  };

  const onCategorieChange = (cat: string) => {
    dispatch(setSelectedCategorie(cat));
    onChange?.({ type: cat });
  };

  // const onPriceRangeChange = (value) => {
  // }

  useEffect(() => {
    let mounted = true;
    const loadTypes = async () => {
      try {
        const res = await fetch('https://adminbuzzmk.com/api/product-types', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const names = (data?.types ?? []).map((t: { name: string }) => t.name).filter(Boolean);
        if (mounted) setCategoriesSet(names);
      } catch {
        // ignore
      }
    };
    loadTypes();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('search')}</label>
        <input
          type="text"
          value={search}
          placeholder={t('searchPlaceholder')}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            onChange?.({ q: value });
          }}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-2">{t('collections')}</h3>
        <ul className="space-y-1">
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                checked={filters.selectedCollection === 'all'}
                onChange={() => {
                  onCollectionChange("all");
                }}
              />{" "}
              {t('all')}
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                checked={filters.selectedCollection === 'trending'}
                onChange={() => {
                  onCollectionChange("trending");
                }}
              />{" "}
              {t('trending')}
            </label>
          </li>

          {collectionsSet.map((c) => (
            <li key={c}>
              <label>
                <input
                  type="radio"
                  name="collection"
                    checked={filters.selectedCollection === c}
                  onChange={() => {
                    onCollectionChange(c);
                  }}
                />{" "}
                {c}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">{t('categories')}</h3>
        <ul className="space-y-1">
          <li>
            <label>
              <input
                type="radio"
                name="cat"
                checked={filters.selectedCategorie === ''}
                onChange={() => {
                  onCategorieChange("");
                  onChange?.({ type: '' });
                }}
              />{" "}
              {t('all')}
            </label>
          </li>
          {categoriesSet.map((cat) => (
            <li key={cat}>
              <label>
                <input
                  type="radio"
                  name="cat"
                  checked={filters.selectedCategorie === cat}
                  onChange={() => {
                    onCategorieChange(cat);
                    onChange?.({ type: cat });
                  }}
                />{" "}
                {getCategoryLabel(cat)}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">{t('price')}</h3>
        <RangeSlider
          min={10}
          max={100}
          value={[filters.priceRange.min, filters.priceRange.max]}
          onInput={(val) => {
            const [min, max] = val as number[];
            dispatch(setPriceRange({ min, max }));
            onChange?.({ minPrice: String(min), maxPrice: String(max) });
          }}
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>€{filters.priceRange.min}</span>
          <span>€{filters.priceRange.max}</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-2">{t('size')}</h3>
        <div className="flex flex-wrap gap-2">
          {["s", "m", "l", "xl", "xxl"].map((size) => (
            <button
              key={size}
              onClick={() => {
                const next = selectedSizes.includes(size)
                  ? selectedSizes.filter((s) => s !== size)
                  : [...selectedSizes, size];
                setSelectedSizes(next);
                onChange?.({ sizes: next.join(',') });
              }}
              className={`border px-2 py-1 text-sm rounded hover:bg-gray-100 ${selectedSizes.includes(size) ? 'bg-black text-white' : ''}`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
