<template>
  <div class="stc-container">

    <!-- 태그 필터 -->
    <div class="stc-tags">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="['stc-tag-btn', { active: selectedTag === tag }]"
        @click="toggleTag(tag)"
      >
        #{{ tag }}
      </button>
    </div>

    <!-- 글 수 -->
    <p class="stc-count">{{ filteredPosts.length }}개의 기록</p>

    <!-- 카드 그리드 -->
    <div class="stc-grid">
      <a
        v-for="post in filteredPosts"
        :key="post.url"
        :href="post.url"
        class="stc-card"
      >
        <div class="stc-card-date">{{ formatDate(post.date) }}</div>
        <h3 class="stc-card-title">{{ post.title }}</h3>
        <p class="stc-card-excerpt">{{ post.excerpt }}</p>
        <div class="stc-card-tags">
          <span v-for="tag in post.tags" :key="tag" class="stc-card-tag">
            #{{ tag }}
          </span>
        </div>
      </a>

      <div v-if="filteredPosts.length === 0" class="stc-empty">
        <p>해당 태그의 기록이 없습니다.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { data as posts } from '../stay-the-course.data.js'

const selectedTag = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return [...tags]
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(post => post.tags.includes(selectedTag.value))
})

function toggleTag(tag) {
  selectedTag.value = selectedTag.value === tag ? null : tag
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>
