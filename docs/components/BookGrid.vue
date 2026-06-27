<script setup lang="ts">
import { ref, computed } from 'vue'
import { books } from '../books/booksData'

const categories = ['전체', ...new Set(books.map(b => b.category))]
const selectedCategory = ref('전체')

const filteredBooks = computed(() => {
  if (selectedCategory.value === '전체') return books
  return books.filter(b => b.category === selectedCategory.value)
})
</script>

<template>
  <div class="book-grid-container">
    <div class="filters">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="['filter-btn', { active: selectedCategory === category }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="book-grid">
      <div v-for="book in filteredBooks" :key="book.id" class="book-card">
        <div class="cover-wrapper">
          <img :src="book.coverUrl" :alt="book.title" class="book-cover" />
        </div>
        <div class="book-info">
          <span v-if="book.badge" class="badge" :class="{ 'badge-favorite': book.badge.includes('Favorite'), 'badge-recommend': book.badge.includes('Recommendation') }">{{ book.badge }}</span>
          <h3 class="title">{{ book.title }}</h3>
          <p class="author">{{ book.author }}</p>
          <div class="tags">
            <span v-for="tag in book.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p class="description">{{ book.description }}</p>
          <div v-if="book.myComment" class="my-comment">
            <strong>🙋‍♂️ 덧붙이는 말:</strong> {{ book.myComment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-grid-container {
  margin-top: 2rem;
  margin-bottom: 4rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.filter-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-soft);
}

.cover-wrapper {
  width: 100%;
  aspect-ratio: 3 / 4.2;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.book-card:hover .book-cover {
  transform: scale(1.05);
}

.book-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: inline-block;
  align-self: flex-start;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

.badge-favorite {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

.badge-recommend {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.author {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.tag {
  font-size: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: 500;
}

.description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
  flex-grow: 1;
}

.my-comment {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  border-left: 3px solid var(--vp-c-brand-1);
}
</style>
