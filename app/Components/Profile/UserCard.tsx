"use client";
import Image from "next/image";
import { Mail, MapPin, Phone, Camera } from "lucide-react";
import { UserAddress, UserProfile } from "@/app/Types/Types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { setUser } from "@/app/Redux/Slices/userSlice";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/Redux/store";

interface UserCardProps {
  user: UserProfile;
}

export default function UserCard({ user }: UserCardProps) {
  const t = useTranslations("profile");
  const dispatch = useDispatch<AppDispatch>();
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [addressInput, setAddressInput] = useState<UserAddress>(user.address || { street: "", street2: "", city: "", state: "", zip: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authToken = useSelector((s: RootState) => s.user.token);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [shippingClasses, setShippingClasses] = useState<Array<{ _id: string, country: string, name: string, price: number }>>([]);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${base}/shipping-classes`);
        if (!res.ok) return;
        const data = await res.json();
        setShippingClasses(Array.isArray(data?.shippingClasses) ? data.shippingClasses : []);
      } catch { }
    })();
  }, []);

  const handleSave = async () => {
    const { street, street2, city, state, zip, phone } = addressInput;
    if (!street || !city || !state || !zip || !phone) return;
    setError(null);
    try {
      setSaving(true);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${base}/users/me`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          shippingAddress: {
            street1: street,
            street2: street2 || '',
            city,
            state,
            country: addressInput.state,
            zip,
            phone,
          },
        }),
      });
      console.log(res);
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to update address');
      }
      const data = await res.json();
      const u = data?.user;
      const updated: UserProfile = {
        id: u?.id || u?._id || user.id,
        firstName: u?.firstName ?? user.firstName,
        lastName: u?.lastName ?? user.lastName,
        imageUrl: u?.imageUrl || user.imageUrl,
        address: {
          street: u?.shippingAddress?.street1 || street,
          street2: u?.shippingAddress?.street2 || street2 || '',
          city: u?.shippingAddress?.city || city,
          state: u?.shippingAddress?.state || state,
          zip: u?.shippingAddress?.zip || zip,
          phone: u?.shippingAddress?.phone || u?.phone || phone,
        },
        email: u?.email || user.email,
        phone: u?.shippingAddress?.phone || addressInput.phone,
      };
      dispatch(setUser(updated));
      setIsEditingAddress(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };
  const canSave = Boolean(
    addressInput.street.trim() &&
    addressInput.city.trim() &&
    addressInput.state.trim() &&
    addressInput.zip.trim() &&
    addressInput.phone.trim()
  );
  return (
    <section className="w-full bg-white rounded-2xl shadow-custom-white-light p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <div className="relative inline-block">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-accentLight">
            <Image
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <label className="absolute -bottom-1 -right-1 bg-white/90 rounded-full p-1.5 shadow border cursor-pointer z-50">
            <Camera className="w-4 h-4 text-titles" />
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.currentTarget.files?.[0];
                if (!file) return;
                setError(null);
                try {
                  setUploading(true);
                  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
                  const form = new FormData();
                  form.append('file', file);
                  const headers: Record<string, string> = {};
                  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
                  const res = await fetch(`${base}/users/me/image`, { method: 'POST', body: form, credentials: 'include', headers });
                  if (!res.ok) throw new Error('Upload failed');
                  const data = await res.json();
                  const newUrl: string = data?.file?.url || '';
                  if (!newUrl) throw new Error('Invalid upload response');
                  // Save to user profile
                  const saveHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
                  if (authToken) saveHeaders['Authorization'] = `Bearer ${authToken}`;
                  const saveRes = await fetch(`${base}/users/me`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: saveHeaders,
                    body: JSON.stringify({ imageUrl: newUrl }),
                  });
                  if (!saveRes.ok) throw new Error('Failed to save profile image');
                  const saved = await saveRes.json();
                  const u = saved?.user;
                  dispatch(setUser({
                    id: u?.id || u?._id || user.id,
                    firstName: u?.firstName ?? user.firstName,
                    lastName: u?.lastName ?? user.lastName,
                    imageUrl: u?.imageUrl || newUrl,
                    address: user.address,
                    email: u?.email || user.email,
                    phone: u?.shippingAddress?.phone || user.address.phone,
                  }));
                  setFileInputKey((k) => k + 1);
                } catch (err) {
                  const msg = err instanceof Error ? err.message : 'Error';
                  setError(msg);
                } finally {
                  setUploading(false);
                }
              }}
            />
          </label>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-titles tracking-tight">
            {user.firstName} {user.lastName}
          </h1>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-titles">
              <Mail className="w-4 h-4 text-accent" />
              <span>{user.email}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 text-titles sm:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                {!isEditingAddress && user.address && (
                  <>
                    <span>{`${user.address.street}${user.address.street2 ? ", " + user.address.street2 : ""}, ${user.address.city}, ${user.address.state} ${user.address.zip}`}</span>
                    <span className="hidden sm:inline mx-2 text-gray-300">|</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      <span>{user.address?.phone}</span>
                    </span>
                  </>
                )}
                {!isEditingAddress && !user.address && (
                  <span className="text-gray-500">{t("noAddress", { default: "No address on file" })}</span>
                )}
              </div>

              {isEditingAddress ? (
                <div className="w-full sm:w-auto flex flex-col gap-2 sm:ml-4 mt-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={addressInput.street}
                      onChange={(e) => setAddressInput({ ...addressInput, street: e.currentTarget.value })}
                      placeholder={t("address.street", { default: "Street" })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded"
                    />
                    <input
                      type="text"
                      value={addressInput.street2 || ""}
                      onChange={(e) => setAddressInput({ ...addressInput, street2: e.currentTarget.value })}
                      placeholder={t("address.street2", { default: "Street 2 (optional)" })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded"
                    />
                    <input
                      type="text"
                      value={addressInput.city}
                      onChange={(e) => setAddressInput({ ...addressInput, city: e.currentTarget.value })}
                      placeholder={t("address.city", { default: "City" })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded"
                    />
                    <select
                      value={addressInput.state}
                      onChange={(e) => setAddressInput({ ...addressInput, state: e.currentTarget.value })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded bg-white"
                    >
                      <option value="">{t("address.state", { default: "Country" })}</option>
                      {Array.from(new Set(shippingClasses.map(sc => sc.country))).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={addressInput.zip}
                      onChange={(e) => setAddressInput({ ...addressInput, zip: e.currentTarget.value })}
                      placeholder={t("address.zip", { default: "ZIP" })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded"
                    />
                    <input
                      type="text"
                      value={addressInput.phone}
                      onChange={(e) => setAddressInput({ ...addressInput, phone: e.currentTarget.value })}
                      placeholder={t("address.phone", { default: "Phone" })}
                      className="w-full border border-gray-300 px-3 py-1.5 rounded"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm mt-1">
                    <input
                      type="checkbox"
                      checked={Boolean(user.marketingOptIn)}
                      onChange={async (e) => {
                        try {
                          const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
                          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                          if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
                          const res = await fetch(`${base}/users/me`, {
                            method: 'PUT',
                            headers,
                            credentials: 'include',
                            body: JSON.stringify({ marketingOptIn: e.currentTarget.checked }),
                          });
                          if (!res.ok) throw new Error('Failed to update');
                          const data = await res.json();
                          const u = data?.user;
                          dispatch(setUser({
                            id: u?.id || u?._id || user.id,
                            firstName: u?.firstName ?? user.firstName,
                            lastName: u?.lastName ?? user.lastName,
                            imageUrl: u?.imageUrl || user.imageUrl,
                            address: user.address,
                            email: u?.email || user.email,
                            phone: u?.shippingAddress?.phone || user.address.phone,
                            marketingOptIn: Boolean(u?.marketingOptIn),
                          }));
                        } catch { }
                      }}
                    />
                    <span className="text-titles/80">{t('newsletterConsent', { default: 'Receive newsletter and promotions' })}</span>
                  </label>
                  {error && <p className="text-red-600 text-xs">{error}</p>}
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded bg-gray-200 text-titles"
                      onClick={() => {
                        setIsEditingAddress(false);
                        setAddressInput(user.address || { street: "", street2: "", city: "", state: "", zip: "", phone: "" });
                      }}
                    >
                      {t("cancel", { default: "Cancel" })}
                    </button>
                    <button
                      className="px-3 py-1.5 rounded bg-black text-white disabled:opacity-60"
                      onClick={handleSave}
                      disabled={!canSave || saving}
                    >
                      {saving ? t('saving', { default: 'Saving...' }) : t("save", { default: "Save" })}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 sm:mt-0 sm:ml-4">
                  {user.address ? (
                    <button
                      className="px-3 py-1.5 rounded bg-black text-white"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      {t("editAddress", { default: "Edit Address" })}
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1.5 rounded bg-black text-white"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      {t("addAddress", { default: "Add Address" })}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


