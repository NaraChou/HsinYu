import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import { COURSES_DATA, SENIOR_HIGH_DATA, EDUCATION_STAGES } from '../data/appData';
import { LAYOUT } from '../styles/layout';

/**
 * [A] 視覺資訊備註
 * 頁面：課程體系 (Courses Page)
 * 視覺語言：分區塊切割、ScrollTrigger 進場、課程卡片 hover 互動
 *
 * 規範修正 (2026-04-27)：
 * - wrapperRef 型別從 useRef<HTMLElement>（搭配 as any）
 *   改為 useRef<HTMLDivElement>，消除 TypeScript any 逃生
 *
 * 效能修正 (2026-05-01，依據 Risk Report)：
 * - courseSyllabus 展開動畫：max-height → grid-template-rows: 0fr → 1fr
 *   原本 max-height 每 frame 觸發 Layout Reflow；
 *   grid-template-rows 只觸發 Composite，GPU 友善且動畫速度自然。
 * - scrollToHash：移除硬編碼 - 80 offset，改用 scrollIntoView()
 *   佈局 offset 邏輯回歸 CSS（style.css 的 scroll-margin-top: 80px），
 *   Header 高度變動時只需修改 CSS 一處，不再散落各元件。
 */

gsap.registerPlugin(ScrollTrigger);

// [B-0] GSAP 白名單
const GSAP_SELECTORS = {
  section:     'course-section',
  card:        'course-card',
  sectionTitle:'course-section-title',
} as const;

// [B] 樣式常數（Layout → Visual → State → Responsive）
const STYLES = {
  // [修正] wrapper 對應 div，ref 改為 HTMLDivElement（不需要 as any）
  wrapper:         'flex flex-col w-full min-h-screen bg-[var(--ui-bg)] theme-transition pt-24',

  // Section
  section:         'relative w-full py-24 border-b border-[var(--ui-border)] last:border-b-0 overflow-hidden theme-transition md:py-32',
  sectionHeader:   'flex flex-col items-center mb-16 px-6 text-center',
  sectionWatermark:'absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden',
  sectionTitle:    'relative z-10 text-4xl font-black text-[var(--brand-primary)] tracking-widest uppercase mb-4 theme-transition md:text-5xl',
  sectionDesc:     'relative z-10 text-sm tracking-[0.3em] text-[var(--text-sub)] uppercase',
  watermarkText:   'text-[12rem] font-black tracking-[0.05em] uppercase opacity-[0.04] text-[var(--brand-primary)] whitespace-nowrap theme-transition select-none md:text-[18rem]',

  // Course grid
  courseGrid:      `${LAYOUT.container} grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:gap-12`,
  courseCard:      'group flex flex-col p-8 border border-[var(--ui-border)] bg-[var(--ui-bg)] transition-all duration-500 theme-transition hover:border-[var(--brand-primary)] hover:shadow-lg',
  courseHeader:    'flex items-start justify-between mb-6',
  courseName:      'text-xl font-bold text-[var(--brand-primary)] theme-transition',
  courseCategory:  'px-3 py-1 border border-[var(--ui-border)] rounded-full text-xs tracking-widest text-[var(--text-sub)] theme-transition',
  courseDesc:      'text-sm leading-relaxed text-[var(--text-sub)] mb-6 theme-transition',
  courseFeatures:  'flex flex-wrap gap-2 mb-8',
  courseTag:       'px-3 py-1 border border-[var(--ui-border)] rounded-full text-xs tracking-widest text-[var(--text-sub)] theme-transition',
  courseMeta:      'flex flex-col gap-3 mt-auto pt-6 border-t border-[var(--ui-border)]',
  courseMetaRow:   'flex items-center gap-2 text-xs text-[var(--text-sub)] theme-transition',
  coursePrice:     'text-sm font-bold text-[var(--brand-primary)] theme-transition',
  // [效能修正] max-height → grid-template-rows 展開動畫（無 Reflow）
  syllabusOuter:   'grid mt-6 pt-6 border-t border-[var(--ui-border)] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr] group-hover:opacity-100',
  syllabusInner:   'overflow-hidden',
  syllabusTitle:   'text-[10px] font-black tracking-[0.2em] text-[var(--text-sub)] uppercase mb-3',
  syllabusItem:    'flex items-center gap-2 text-xs text-[var(--text-sub)] mb-2 theme-transition',
  syllabusDot:     'w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] shrink-0 theme-transition',
} as const;

export const Courses: React.FC = () => {
  // [修正] 型別改為 HTMLDivElement，移除 as any
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location   = useLocation();

  useEffect(() => {
    if (location.hash) {
      // [效能修正] scrollIntoView + CSS scroll-margin-top: 80px（style.css）
      // 移除硬編碼 -80，Header 高度變動只需改 CSS 一處
      const id = setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(id);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Section 進場
      gsap.utils.toArray<HTMLElement>(`.${GSAP_SELECTORS.sectionTitle}`).forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        });
      });

      // Card 瀑布流
      gsap.utils.toArray<HTMLElement>(`.${GSAP_SELECTORS.card}`).forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 60, opacity: 0, duration: 0.9, delay: (idx % 2) * 0.15, ease: 'power3.out',
        });
      });
    }, wrapperRef); // [修正] scope 對應正確型別，不需要 as any

    return () => { ctx.revert(); };
  }, []);

  return (
    // [修正] div + ref={wrapperRef}，型別完全吻合（HTMLDivElement）
    <div className={STYLES.wrapper} ref={wrapperRef}>
      {EDUCATION_STAGES.map((stage) => (
        <section
          key={stage.id}
          id={stage.id}
          className={`${GSAP_SELECTORS.section} ${STYLES.section}`}
        >
          {/* 浮水印 */}
          <div className={STYLES.sectionWatermark} aria-hidden="true">
            <span className={STYLES.watermarkText}>{stage.watermark}</span>
          </div>

          <header className={STYLES.sectionHeader}>
            <h1 className={`${GSAP_SELECTORS.sectionTitle} ${STYLES.sectionTitle}`}>
              {stage.title}
            </h1>
            <p className={STYLES.sectionDesc}>{stage.desc}</p>
          </header>

          <div className={STYLES.courseGrid}>
            {stage.data.map((course) => (
              <article key={course.id} className={`${GSAP_SELECTORS.card} ${STYLES.courseCard}`}>
                <div className={STYLES.courseHeader}>
                  <h2 className={STYLES.courseName}>{course.title}</h2>
                  <span className={STYLES.courseCategory}>{course.category}</span>
                </div>

                <p className={STYLES.courseDesc}>{course.desc}</p>

                <div className={STYLES.courseFeatures}>
                  {course.features.map((feat, idx) => (
                    <span key={idx} className={STYLES.courseTag}>{feat}</span>
                  ))}
                </div>

                <div className={STYLES.courseMeta}>
                  <div className={STYLES.courseMetaRow}>
                    {course.teachers.map((t, idx) => (
                      <span key={idx}>{t}</span>
                    ))}
                  </div>
                  <div className={STYLES.coursePrice}>{course.price}</div>
                </div>

                {/* Hover 展開課綱（grid-template-rows 無 Reflow 版） */}
                <div className={STYLES.syllabusOuter}>
                  <div className={STYLES.syllabusInner}>
                    <div className={STYLES.syllabusTitle}>週次課綱</div>
                    {course.syllabus.map((item, idx) => (
                      <div key={idx} className={STYLES.syllabusItem}>
                        <span className={STYLES.syllabusDot} aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
