'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { FiUser, FiMapPin, FiImage, FiEdit3 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const categoryOptions = ['Singer', 'DJ', 'Dancer', 'Speaker'];
const languageOptions = ['Hindi', 'English', 'Punjabi', 'Bengali'];
const feeOptions = ['₹0 - ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+'];

type FormData = {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  fee: string;
  location: string;
  profileImage?: FileList;
};

const schema = yup.object({
  name: yup.string().required('Name is required'),
  bio: yup.string().min(20, 'Bio must be at least 20 characters').required(),
  category: yup.array().of(yup.string()).min(1, 'Select at least one category'),
  languages: yup.array().of(yup.string()).min(1, 'Select at least one language'),
  fee: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
  profileImage: yup.mixed().notRequired(),
});

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
const onSubmit = (data: FormData) => {
  const existing = JSON.parse(localStorage.getItem('artists') || '[]');
  const newArtist = { id: Date.now(), ...data };
  localStorage.setItem('artists', JSON.stringify([...existing, newArtist]));

  toast.success('Artist profile submitted successfully!');
};
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Artist Onboarding Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name */}
        <div>
          <label className=" font-medium mb-1 flex items-center gap-2">
            <FiUser /> Name
          </label>
          <input
            {...register('name')}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-purple-500"
            placeholder="Enter full name"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>

        {/* Bio */}
        <div>
          <label className=" font-medium mb-1 flex items-center gap-2">
            <FiEdit3 /> Bio
          </label>
          <textarea
            {...register('bio')}
            rows={4}
            placeholder="Tell us about your background and performance style"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-sm text-red-500">{errors.bio?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">Select Categories</label>
          <div className="flex flex-wrap gap-3">
            {categoryOptions.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={cat}
                  {...register('category')}
                  className="accent-purple-600"
                />
                {cat}
              </label>
            ))}
          </div>
          <p className="text-sm text-red-500">{errors.category?.message}</p>
        </div>

        {/* Languages */}
        <div>
          <label className="block font-medium mb-2">Languages Spoken</label>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={lang}
                  {...register('languages')}
                  className="accent-purple-600"
                />
                {lang}
              </label>
            ))}
          </div>
          <p className="text-sm text-red-500">{errors.languages?.message}</p>
        </div>

        {/* Fee */}
        <div>
          <label className="block font-medium mb-1">Fee Range</label>
          <select
            {...register('fee')}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select your fee range</option>
            {feeOptions.map((fee) => (
              <option key={fee} value={fee}>
                {fee}
              </option>
            ))}
          </select>
          <p className="text-sm text-red-500">{errors.fee?.message}</p>
        </div>

        {/* Location */}
        <div>
          <label className=" font-medium mb-1 flex items-center gap-2">
            <FiMapPin /> Location
          </label>
          <input
            {...register('location')}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Mumbai, Delhi"
          />
          <p className="text-sm text-red-500">{errors.location?.message}</p>
        </div>

        {/* Profile Image */}
        <div>
          <label className=" font-medium mb-1 flex items-center gap-2">
            <FiImage /> Profile Image (optional)
          </label>
          <input
            type="file"
            {...register('profileImage')}
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-black text-white text-sm font-medium rounded-md transition hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
