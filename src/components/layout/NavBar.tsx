import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function NavBar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { name: 'Games', path: '/' },
        { name: 'Friends', path: '/friends' },
        { name: 'Achievements', path: '/achievements' },
    ];

    return (
        <header className="bg-game-dark border-b border-game-border sticky top-0 z-50 shadow-lg">
            <nav className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                <span className="text-white font-bold text-xl">🎮</span>
                            </div>
                            <span className="text-xl font-bold text-white hidden sm:block">
                Bandit Games
              </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive(item.path)
                                        ? 'bg-brand-primary text-white shadow-lg shadow-blue-500/50'
                                        : 'text-gray-300 hover:bg-game-hover hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3">
                        {/* Search */}
                        <button className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-game-card rounded-lg text-sm text-gray-400 hover:bg-game-hover hover:text-gray-300 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden xl:inline">Search games...</span>
                        </button>

                        {/* User Menu - Desktop */}
                        <div className="hidden md:flex items-center space-x-3 bg-game-card rounded-lg px-3 py-2 hover:bg-game-hover transition-all cursor-pointer">
                            <div className="text-right">
                                <div className="text-sm font-medium text-white">Guest User</div>
                                <div className="text-xs text-gray-400">Free Account</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-game-border">
                                G
                            </div>
                        </div>

                        <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-game-border">
                            G
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-game-hover hover:text-white transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-game-border">
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                        isActive(item.path)
                                            ? 'bg-brand-primary text-white'
                                            : 'text-gray-300 hover:bg-game-hover hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button className="w-full text-left px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-game-hover hover:text-white transition-all flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Search games...</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
