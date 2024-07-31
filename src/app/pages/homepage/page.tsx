"use client"
import React from 'react'
import Welcome from '@/components/welcome'
import useClearCacheload from '@/hooks/useClearCacheload'


const HomePage = () => {
  useClearCacheload();

  return (
    <main>

      <Welcome
        title="歡迎頁面"
        description="這是一個集結TailwindCSS, Strapi內容管理, API結構化, UI套件管理, CloudFlare部屬於一身的網站。"
        buttonText="開啟偉大航道"
      />

    </main>

  )
}

export default HomePage;