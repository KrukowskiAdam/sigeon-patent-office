import { getTeamMembers } from '@/lib/queries'
import { TeamMember } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export default async function TeamPage() {
  const team = await getTeamMembers()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0abaee] to-[#0891b2] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Patent Office
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/news" className="hover:text-blue-200">News</Link>
              <Link href="/team" className="text-blue-200">Team</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nasz zespół</h1>
            <p className="text-xl text-gray-600">
              Poznaj doświadczonych specjalistów ds. własności intelektualnej
            </p>
          </div>
          
          {team.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Brak członków zespołu do wyświetlenia.</p>
              <p className="text-gray-500 mt-2">Dodaj pierwszego członka zespołu w Sanity Studio.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member: TeamMember) => (
                <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {member.photo && (
                    <div className="h-64 relative">
                      <Image
                        src={urlFor(member.photo).width(400).height(300).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h2>
                    
                    <p className="text-blue-600 font-medium mb-4">
                      {member.position.pl}
                    </p>
                    
                    {member.specializations && member.specializations.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Specjalizacje:</h3>
                        <div className="flex flex-wrap gap-1">
                          {member.specializations.map((spec, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-[#0abaee]/10 text-[#0891b2] px-2 py-1 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {member.languages && member.languages.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Języki:</h3>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map((lang, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      {member.email && (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Email:</span> 
                          <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800 ml-1">
                            {member.email}
                          </a>
                        </p>
                      )}
                      {member.phone && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Telefon:</span> 
                          <a href={`tel:${member.phone}`} className="text-blue-600 hover:text-blue-800 ml-1">
                            {member.phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Patent Office. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  )
}