<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const entries = computed(() => ([
  {
    id: 1,
    title: t('classements.individualHeroTitle'),
    description: t('classements.individualHeroSubtitle'),
    to: { name: 'classement-individuel' },
    accent: 'accent-blue'
  },
  {
    id: 2,
    title: t('classements.teamHeroTitle'),
    description: t('classements.teamHeroSubtitle'),
    to: { name: 'classement-equipe' },
    accent: 'accent-pink'
  },
  {
    id: 3,
    title: t('classements.leaderboardHeroTitle'),
    description: t('classements.leaderboardHeroSubtitle'),
    to: { name: 'classement-leaderboard' },
    accent: 'accent-gold'
  }
]))
</script>

<template>
  <section class="hub-page">
    <header class="hero">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('classements.heroLabel') }}</p>
        <h1>{{ $t('classements.hubTitle') }}</h1>
        <p>{{ $t('classements.hubSubtitle') }}</p>
      </div>
    </header>

    <div class="cards">
      <router-link
        v-for="entry in entries"
        :key="entry.id"
        class="card"
        :class="entry.accent"
        :to="entry.to"
      >
        <div class="card-content">
          <p class="label">{{ $t('classements.discover') }}</p>
          <h2>{{ entry.title }}</h2>
          <p class="desc">{{ entry.description }}</p>
          <span class="cta">{{ $t('classements.seeDetails') }}</span>
        </div>
        <div class="shine"></div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.hub-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  width: 100%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.35), transparent 55%),
              radial-gradient(circle at 80% 10%, rgba(236, 72, 153, 0.4), transparent 60%),
              linear-gradient(135deg, #020617, #0f172a);
}

.hero-overlay {
  backdrop-filter: blur(8px);
  background-color: rgba(0,0,0,0.35);
  padding: 2rem 3rem;
  border-radius: 24px;
  text-align: center;
  max-width: 720px;
  color: #fff;
}

.hero h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: clamp(2rem, 5vw, 3.2rem);
  margin-bottom: 1rem;
}

.kicker {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.cards {
  width: min(1200px, 95%);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: -4rem auto 4rem;
}

.card {
  position: relative;
  background: #0f172a;
  border-radius: 24px;
  padding: 2.2rem;
  color: white;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.15);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 40px 70px rgba(15, 23, 42, 0.25);
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card h2 {
  margin: 0;
  font-size: 1.8rem;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
}

.card .desc {
  color: rgba(255, 255, 255, 0.85);
  min-height: 60px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  opacity: 0.8;
}

.cta {
  margin-top: 0.5rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.cta::after {
  content: '→';
}

.shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .shine {
  opacity: 1;
}

.accent-blue {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
}

.accent-pink {
  background: linear-gradient(135deg, #9d174d, #ec4899);
}

.accent-gold {
  background: linear-gradient(135deg, #92400e, #fbbf24);
}

@media (max-width: 768px) {
  .cards {
    margin-top: -2rem;
  }
}
</style>
