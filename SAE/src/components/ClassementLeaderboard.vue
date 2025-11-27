<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ClassementService from '@/services/classement.service.js'

const { t } = useI18n()
const leaderboard = ref([])
const userPoints = ref([])
const isLoading = ref(true)

function percent(part, total) {
  if (!total) return 0
  const value = Math.round((part / total) * 100)
  if (value < 0) return 0
  if (value > 100) return 100
  return value
}

const leaderboardWithBreakdown = computed(() => {
  const map = new Map(userPoints.value.map(entry => [entry.id_user, entry]))
  return leaderboard.value.map(row => ({
    ...row,
    breakdown: map.get(row.id_user) || { points_by_stand: [], points_by_activity: [] }
  }))
})

const spotlight = computed(() => leaderboard.value.slice(0, 3))
const others = computed(() => leaderboardWithBreakdown.value.slice(3))

onMounted(async () => {
  const [lb, detailed] = await Promise.all([
    ClassementService.getLeaderboard(),
    ClassementService.getUserPoints()
  ])
  leaderboard.value = lb
  userPoints.value = detailed
  isLoading.value = false
})
</script>

<template>
  <section class="classement-page">
    <header class="hero hero-leaderboard">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('classements.heroLabel') }}</p>
        <h1>{{ $t('classements.leaderboardHeroTitle') }}</h1>
        <p>{{ $t('classements.leaderboardHeroSubtitle') }}</p>
      </div>
    </header>

    <div class="content" v-if="!isLoading">
      <section class="spotlight" v-if="spotlight.length">
        <article v-for="entry in spotlight" :key="entry.id_user" class="spotlight-card" :class="`rank-${entry.rank}`">
          <span class="rank">#{{ entry.rank }}</span>
          <h2>{{ entry.name }}</h2>
          <p class="points">{{ entry.total }} {{ $t('classements.points') }}</p>
          <div class="bars">
            <div class="bar-row">
              <span class="bar-label">{{ $t('classements.standPoints') }}</span>
              <div class="bar">
                <span class="bar-fill" :style="{ width: percent(entry.standPoints, entry.total) + '%' }"></span>
                <span class="bar-value">{{ entry.standPoints }} {{ $t('classements.points') }}</span>
              </div>
            </div>
            <div class="bar-row">
              <span class="bar-label">{{ $t('classements.activityPoints') }}</span>
              <div class="bar">
                <span class="bar-fill" :style="{ width: percent(entry.activityPoints, entry.total) + '%' }"></span>
                <span class="bar-value">{{ entry.activityPoints }} {{ $t('classements.points') }}</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="list">
        <article v-for="entry in others" :key="entry.id_user" class="list-row">
          <div class="rank">#{{ entry.rank }}</div>
          <div class="info">
            <h3>{{ entry.name }}</h3>
            <div class="chips">
              <span v-for="stand in entry.breakdown.points_by_stand" :key="stand.stand_id" class="chip">
                {{ stand.stand_id }} <strong>{{ stand.points }}</strong>
              </span>
            </div>
          </div>
          <div class="points-block">
            <p>{{ $t('classements.points') }}</p>
            <strong>{{ entry.total }}</strong>
          </div>
          <div class="activities">
            <p>{{ $t('classements.activityPoints') }}</p>
            <ul>
              <li v-for="act in entry.breakdown.points_by_activity" :key="act.nom">
                {{ act.nom }} · <strong>{{ act.points }}</strong>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </div>

    <div v-else class="loading">
      <p>{{ $t('classements.loading') }}</p>
    </div>
  </section>
</template>

<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.classement-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  width: 100%;
  min-height: 45vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  background-size: cover;
  background-position: center;
}

.hero-leaderboard {
  background: radial-gradient(circle at 15% 30%, rgba(59, 130, 246, 0.65), transparent 55%),
              radial-gradient(circle at 85% 20%, rgba(248, 113, 113, 0.55), transparent 50%),
              linear-gradient(135deg, #020617, #0f172a);
}

.hero-overlay {
  backdrop-filter: blur(8px);
  background-color: rgba(0,0,0,0.4);
  padding: 2rem 3rem;
  border-radius: 24px;
  max-width: 720px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}

.hero h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: clamp(2rem, 5vw, 3.4rem);
  margin-bottom: 1rem;
}

.hero .kicker {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
}

.content {
  width: min(1200px, 95%);
  margin: 2rem auto 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.spotlight {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.spotlight-card {
  background: white;
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.1);
  text-align: center;
  color: #0f172a;
}

.spotlight-card.rank-1 {
  background: linear-gradient(150deg, #fff7e6, #fde68a);
}

.spotlight-card.rank-2 {
  background: linear-gradient(150deg, #f8fafc, #e2e8f0);
}

.spotlight-card.rank-3 {
  background: linear-gradient(150deg, #fef3c7, #fdba74);
}

.spotlight-card .rank {
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  color: #94a3b8;
}

.spotlight-card h2 {
  margin: 0.5rem 0;
}

.points {
  font-size: 2rem;
  font-weight: 700;
}

.bars {
  margin-top: 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.bar-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475569;
}

.bar {
  position: relative;
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
  height: 18px;
  overflow: hidden;
  box-shadow: inset 0 0 6px rgba(15, 23, 42, 0.25);
}

.bar-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #38bdf8, #6366f1);
}

.bar-value {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(15, 23, 42, 0.6);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-row {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 80px 1fr 150px 220px;
  gap: 1rem;
  align-items: center;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.06);
  border: 1px solid transparent;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #a5b4fc, #f472b6);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.list-row .rank {
  font-size: 1.4rem;
  font-weight: 700;
}

.list-row .chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.chip {
  background: #eef2ff;
  border-radius: 999px;
  padding: 0.2rem 0.8rem;
  font-size: 0.85rem;
  color: #3730a3;
  box-shadow: inset 0 0 0 1px rgba(55, 48, 163, 0.2);
}

.points-block {
  text-align: center;
}

.points-block strong {
  display: block;
  font-size: 1.6rem;
  margin-top: 0.25rem;
}

.activities ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
}

.activities strong {
  font-weight: 600;
  color: #1d4ed8;
}

.activities li + li {
  margin-top: 0.3rem;
}

.loading {
  margin: 4rem auto;
  font-size: 1.2rem;
}

@media (max-width: 900px) {
  .list-row {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .points-block, .activities {
    text-align: left;
  }
}
</style>
