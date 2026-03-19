import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white/40 py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Shop and Learn</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">iPhone</a></li>
            <li><a href="#" className="hover:text-white transition-colors">iPad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mac</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Watch</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Apple Music</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Apple TV+</a></li>
            <li><a href="#" className="hover:text-white transition-colors">iCloud</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Apple Store</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Genius Bar</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Today at Apple</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-semibold">About Apple</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Apple Leadership</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Career Opportunities</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-xs">
        <p>Copyright © 2026 iPhone 17 Project. All rights reserved.</p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Sales Policy</a>
        </div>
      </div>
    </footer>
  );
}
