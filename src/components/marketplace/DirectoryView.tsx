import React, { useState } from 'react';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
import { BusinessProfile } from '../../types';

interface Props {
  businesses: BusinessProfile[];
  onSelectBusinessToBook: (handle: string) => void;
}

export const DirectoryView: React.FC<Props> = ({ businesses, onSelectBusinessToBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cityFilter, setCityFilter] = useState('Valdosta, GA');

  const categories = [
    'All',
    'Esthetics & Skincare',
    'Hair Salon & Color',
    'Barbershop & Grooming',
    'Lashes & Brows',
    'Massage Therapy'
  ];

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      b.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Hair Salon & Color' && b.category.includes('Salon')) ||
      (selectedCategory === 'Esthetics & Skincare' && b.category.includes('Esthetics'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#07130E] text-[#FFFFFF] pb-24">
      
      {/* Directory Hero Banner */}
      <div className="relative py-16 md:py-20 border-b border-[#1B362A] bg-gradient-to-b from-[#0D221A] to-[#07130E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A86A] px-3.5 py-1 rounded-full bg-[#C9A86A]/15 border border-white/10">
            Public Consumer Marketplace
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Discover Top Beauty & Wellness Professionals
          </h1>

          <p className="text-[#D5DFDA] text-sm sm:text-base max-w-2xl mx-auto">
            Book top-rated estheticians, master hairstylists, barbers, and massage therapists in your area with instant online scheduling.
          </p>

          {/* Search Strip */}
          <div className="max-w-3xl mx-auto mt-8 bg-[#0D221A] rounded-3xl border border-white/10 p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#C9A86A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. Balayage, Chemical Peel, Fade)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-[#E5EBE7]/50 focus:outline-none"
              />
            </div>

            <div className="h-6 w-px bg-[#1B362A] hidden sm:block"></div>

            <div className="relative w-full sm:w-56">
              <MapPin className="w-4 h-4 text-[#C9A86A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-transparent pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-[#E5EBE7]/50 focus:outline-none font-mono"
              />
            </div>

            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-xs transition-colors shrink-0 cursor-pointer hover:brightness-105"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'gold-gradient-bg text-[#07130E] shadow-md font-bold'
                  : 'bg-[#0D221A] text-[#D5DFDA] border border-white/10 hover:border-white/30/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((biz) => (
            <div
              key={biz.id}
              className="bg-[#0D221A] rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:border-white/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image & Rating Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={biz.coverImage}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D221A] via-transparent to-transparent"></div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#07130E]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20/40 text-xs font-bold text-white">
                    <Star className="w-3.5 h-3.5 fill-[#C9A86A] text-[#C9A86A]" />
                    <span>{biz.rating}</span>
                    <span className="text-[#D5DFDA]/70 font-normal">({biz.reviewCount})</span>
                  </div>

                  <div className="absolute -bottom-5 left-5">
                    <img
                      src={biz.avatar}
                      alt={biz.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0D221A] shadow-md"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-8 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-[#C9A86A] transition-colors">
                      {biz.name}
                    </h3>
                    <p className="text-xs font-bold text-[#C9A86A] uppercase tracking-wider mt-0.5">
                      {biz.category}
                    </p>
                  </div>

                  <p className="text-xs text-[#D5DFDA] line-clamp-2 leading-relaxed">
                    {biz.tagline}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#D5DFDA]/80 pt-2 border-t border-[#1B362A]">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{biz.address}, {biz.city}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {biz.amenities.slice(0, 2).map((a, i) => (
                      <span key={i} className="text-[10px] bg-[#07130E] border border-white/10 text-white px-2 py-0.5 rounded-md">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book Button Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBusinessToBook(biz.handle)}
                  className="w-full py-3 px-4 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:brightness-105"
                >
                  <span>Book with {biz.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
