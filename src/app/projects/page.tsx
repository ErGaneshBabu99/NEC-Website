"use client";

import { useMemo, useState } from "react";
import { COLORS } from "@/lib/theme";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type District = { name: string; projects: string[] };
type Province = { name: string; districts: District[] };

const PROVINCES: Province[] = [
  {
    name: "Koshi",
    districts: [
      { name: "Panchthar", projects: ["Falgunanda RM (Aangsarang-7 WSP)", "Miklajung RM (Jogidanda WSP)", "Hilihang RM (Khaireni WSP)", "Phalelung RM (Nibhare WSP, Chitre Kutidanda Salabote WSP)", "Kummayak RM (Pring Khola WSP)", "Phidim Municipality (Lumfabung WSP)", "Aathrai Tribeni RM", "Mauwakhola RM"] },
      { name: "Bhojpur", projects: ["Rawabesi RM", "Diktel Rupakot Majhuwagadhi Municipality (Jhagare Chharchhare WSP)", "Sakela RM", "Hatuwagadi RM", "Aamchowk RM", "Ramprasad Rai RM", "Shyam Khola Dingla", "Bhalugaide"] },
      { name: "Khotang", projects: ["Sabsu Khola Bijayakhark Baseri Lift WSP", "Diprung Lifting WSP (Diprung RM)", "Jantedhunga RM (Bopung WSP)", "Patheka WSP", "Khotehang WSP", "Napse Pankhu WSP", "Rabukhola Lifting WSP", "Halesi WSP"] },
      { name: "Solukhumbu", projects: ["Nele Bazar Wastewater Management Project", "Okhaldhunga/Solu Waste Water Projects", "Merandi WSP", "Taksindhu WSP", "Gorakhani WSP", "Khumbu Pasang Lhamu RM WSP", "Solududhkunda Municipality WSP", "Sotang RM (Sotang Kelchalk WSP)"] },
      { name: "Okhaldhunga", projects: ["Siddhicharan Municipality Water Resources Management Project", "Balkhu Sunkoshi 1 Lifting WSP"] },
      { name: "Sunsari", projects: ["Ramdhuni Municipality (Deepboring WSP)", "Barahachhetra Municipality (Archale Katahare, Kerabari, Archale Bagdal WSP)", "Dharan Sub-Metropolitan City", "Devanganj RM", "Dumraha WSP"] },
      { name: "Dhankuta, Sankhuwasabha & Terhathum", projects: ["Dhami Khet Muhan WSP", "Madi WSP", "Philphile WSP", "Aakhibhui WSP", "Sanbhugaun WSP", "Sisnekhola WSP", "Baikunthey WSP", "Bhulke WSP", "Pinguwa Khola WSP", "Ramse WSP", "Phulmichhe WSP"] },
      { name: "Ilam & Jhapa", projects: ["Shibsatakshi Municipality (Shibganj WSP)", "Ilam Municipality (Hilekhola Karki Gaun WSP, Sakale Sukhani WSP)"] },
      { name: "Taplejung", projects: ["Nayaban WSP (Mauwakhola)", "Sidure Dhara Gairigau WSP (Aathrai-2)"] },
    ],
  },
  {
    name: "Bagmati",
    districts: [
      { name: "Kathmandu", projects: ["Kirtipur Municipality (Kirtipur Brihat Sewerage & Rautevir WSP, Chhotkhola Tambari WSP)", "Tokha Municipality", "Nagarjuna Municipality (Ichangunarayan WSP)", "Budhanilkanth Municipality (Chayanedanda Gurungtol & Pasikot WSP)", "Chandragiri Municipality (Deep Boring & Tank Construction)", "Sitapaila", "Ramkot"] },
      { name: "Lalitpur", projects: ["Mahalaxmi Municipality (Sashambu WSP)"] },
      { name: "Bhaktapur", projects: ["Panidhara WSP", "Bhairab Tole WSP", "Masine Chisapani Lift WSP", "Jayantigaun", "Simakholshi Kandechaur Integrated WSP"] },
      { name: "Sindhupalchok", projects: ["Roshi RM (Sinkilekh Lift WSP, Kutidanda Muhan WSP)", "Bhotekoshi RM (Mulkot Khola Bagar WSP)", "Kagane Banshangu WSP", "Dumrechaur WSP", "Langur Changa Pakhar Dobhan WSP", "Odhai Kalleri WSP", "Sukute Bazaar WSP", "Sallahghari Deep Boring WSP", "Kanglang WSP", "Chishapani Daduwa Lift WSP", "Bhotechaur Brihat WSP", "Bukam Brihat WSP", "Ranitar Khatarr WSP", "Sunkoshi Jyamire Ukhubari Lifting WSP"] },
      { name: "Dhading", projects: ["Galchi RM (Khayerghari Santifaat Bridge 30m, Aadamkhola-Aamdanda-Pokhari Gaun-Kalleri Road 29.5km, Baireni Bazar WSSP)", "Gajuri RM (Bange WSSP, Raile Dhunge WSSP)", "Khaniyabas RM (Meyam WSSP)", "Dhunibesi Municipality", "Netrawati Dabjong RM (Hume Pipe Culvert Project)", "Thanibas WSP", "Banda Gau Aarvas Tole WSP", "Jyamire WSP", "Pipaltar Lift WSP", "Malekhu Nayabazar Kafle Tole WSP", "Sirish Khola Lift WSP"] },
      { name: "Sindhuli", projects: ["Haiwar Lift WSP", "Maishir Bichatole WSP", "Charghare Kalapani WSP", "Haiwatar Lift WSP"] },
      { name: "Ramechhap", projects: ["Dhadey Kattike Bata Raikar Danda Gaun WSP", "Palati Khola Betali WSP", "Singhapuri Tinchowke Lifting WSP", "Masantaar Lift WSP", "Gadwary Lift WSP"] },
      { name: "Kavrepalanchowk & Makwanpur", projects: ["Krauje WSP (Bagmati RM)", "Chardhare Sangpragan Meldim WSP & Ghare WSP (Bakaiya RM)", "Baghmara WSP (Bhimphedi RM)", "Katuspani Pumping WSP & Loseghaari Kholcho WSP (Bagmati RM)"] },
      { name: "Chitwan", projects: ["Ichhakamana RM (Syangdi Chandithan WSP)", "Rapti RM (Dangkhola Padadu WSP)"] },
    ],
  },
  {
    name: "Gandaki",
    districts: [
      { name: "Lamjung", projects: ["Sundarbazar Municipality (Bhotewodar Water Quality Improvement Project)"] },
      { name: "Tanahun", projects: ["Bhimad Municipality (Bhimad Municipality Sewerage Treatment Feasibility Study)"] },
    ],
  },
  {
    name: "Karnali",
    districts: [
      { name: "Jumla", projects: ["Dhitaling-Gora-Badgau Chhakale Pani Road (16 km) Detailed Engineering & Design"] },
    ],
  },
  {
    name: "Sudurpashchim",
    districts: [
      { name: "Kailali", projects: ["Dhangadhi Sub-Metropolitan City (Modern Cricket Stadium Feasibility Study)"] },
      { name: "Bajura", projects: ["Kabadi Khola River Training Project"] },
      { name: "Achham", projects: ["Sanfebagar Municipality (Sanfebagar Landfill Site)", "Mallekh RM (Marsekhet-Golabhat Water Supply Project)"] },
    ],
  },
  {
    name: "Lumbini",
    districts: [
      { name: "Bardiya", projects: ["Gulariya Municipality (Gulariya Wastewater Management Project, Bangai WSP, Sorahawa WSP, Phulbari Deep Boring WSP, Sahipur-Padnaha-Khairapur WSP)", "Babai Municipality"] },
    ],
  },
  {
    name: "Madhesh",
    districts: [
      { name: "Parsa", projects: ["Birgunj Municipality (Birgunj Parsa Road Survey & Detailed Design)"] },
    ],
  },
];

export default function ProjectsPage() {
  const [activeProvince, setActiveProvince] = useState<string>("All");

  const visibleProvinces = useMemo(
    () => (activeProvince === "All" ? PROVINCES : PROVINCES.filter((p) => p.name === activeProvince)),
    [activeProvince]
  );

  const totalProjects = useMemo(
    () => PROVINCES.reduce((sum, p) => sum + p.districts.reduce((s, d) => s + d.projects.length, 0), 0),
    []
  );

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: COLORS.paper }} className="w-full min-h-screen">
      <CustomCursor />
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 pb-16" style={{ background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.slateSoft} 100%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>NATIONAL FOOTPRINT</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-4" style={{ color: COLORS.paper }}>
          {totalProjects}+ projects across all seven provinces.
        </h1>
        <p className="text-base max-w-xl" style={{ color: COLORS.paperDim }}>
          Filter by province to browse our work by district and municipality.
        </p>
      </section>

      <section className="px-6 md:px-12 py-10 sticky top-[72px] z-30" style={{ background: COLORS.slateSoft, borderBottom: `1px solid ${COLORS.slateLine}` }}>
        <div className="flex gap-2 flex-wrap">
          {["All", ...PROVINCES.map((p) => p.name)].map((name) => (
            <button
              key={name}
              onClick={() => setActiveProvince(name)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={
                activeProvince === name
                  ? { background: COLORS.orange, color: COLORS.slate }
                  : { background: "transparent", color: COLORS.paperDim, border: `1px solid ${COLORS.slateLine}` }
              }
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: COLORS.slate }}>
        <div className="space-y-14">
          {visibleProvinces.map((province) => (
            <div key={province.name}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.gold }}>{province.name} Province</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {province.districts.map((d) => (
                  <div key={d.name} className="p-5 rounded-lg" style={{ background: COLORS.slateSoft }}>
                    <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.orange }}>{d.name}</h3>
                    <ul className="space-y-1.5">
                      {d.projects.map((proj) => (
                        <li key={proj} className="text-sm leading-relaxed" style={{ color: COLORS.paperDim }}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
