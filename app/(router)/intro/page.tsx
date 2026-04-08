'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 배경 떠다니는 이모지들
const floatingEmojis = [
  '⚡',
  '🌸',
  '🐭',
  '💛',
  '✨',
  '🌟',
  '🎮',
  '💕',
  '🌈',
  '🍡',
];

function FloatingEmoji({
  emoji,
  delay,
  x,
  duration,
}: {
  emoji: string;
  delay: number;
  x: number;
  duration: number;
}) {
  return (
    <motion.div
      className='fixed text-2xl pointer-events-none select-none z-0 opacity-30'
      style={{ left: `${x}%` }}
      initial={{ y: '110vh', rotate: 0 }}
      animate={{ y: '-10vh', rotate: 360 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {emoji}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Intro() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingData = floatingEmojis.map((emoji, i) => ({
    emoji,
    delay: i * 1.2,
    x: (i * 11 + 5) % 95,
    duration: 8 + (i % 4) * 2,
  }));

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 text-gray-700 font-sans overflow-x-hidden relative'>
      {/* 배경 떠다니는 이모지 */}
      {mounted && floatingData.map((d, i) => <FloatingEmoji key={i} {...d} />)}

      {/* Hero */}
      <section className='pt-20 pb-10 px-6 relative z-10'>
        <div className='max-w-[1200px] mx-auto text-center'>
          {/* 프로필 사진 - 둥실둥실 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className='mx-auto mb-6 w-36 h-36 rounded-full overflow-hidden border-4 border-pink-300 shadow-2xl bg-pink-100 flex items-center justify-center relative'
          >
            {/* 반짝이는 링 */}
            <motion.div
              className='absolute inset-0 rounded-full border-4 border-pink-400'
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Image
              src='/image/chiikawa.webp'
              alt='프로필 사진'
              width={70}
              height={70}
              className='object-cover w-36 h-36'
            />
          </motion.div>

          {/* 이름 타이핑 효과처럼 나타나기 */}
          <motion.h1
            className='text-3xl font-bold text-gray-800 mb-2'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          >
            안녕하세요, 저는{' '}
            <motion.span
              className='text-pink-500 inline-block'
              animate={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              김혜진
            </motion.span>
            입니다!
          </motion.h1>

          <motion.p
            className='text-gray-500 text-base'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            최적화를 잘하는 개발자가 되고싶습니다! 🌸 잘 부탁드려요!
          </motion.p>

          {/* 반짝이는 별들 */}
          <div className='flex justify-center gap-2 mt-4'>
            {['✨', '🌟', '✨'].map((s, i) => (
              <motion.span
                key={i}
                className='text-xl'
                // animate={{ scale: [1, 1.4, 1], rotate: [0, 20, 0] }}
                // transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 소개 카드들 */}
      <section className='px-6 pb-10 relative z-10'>
        <div className='max-w-[1200px] mx-auto'>
          <motion.h2
            className='text-xl font-bold text-gray-700 mb-4 flex items-center gap-2'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span>🙋‍♀️</span> 저는 이런 사람이에요
          </motion.h2>

          <motion.div
            className='grid grid-cols-2 gap-3 sm:grid-cols-3'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              //   { icon: '📍', label: '사는 곳', value: '여기 적어줘!' },
              //   { icon: '🧬', label: '전공', value: '여기 적어줘!' },
              { icon: '💡', label: 'MBTI', value: 'INTP' },
              { icon: '🍫', label: '최애 음식', value: '초콜릿, 감자칩' },
              { icon: '✨', label: '취미', value: '게임, 야구, 애니 시청' },
              { icon: '💬', label: 'TMI', value: '키 174cm' },
            ].map(({ icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{
                  scale: 1.07,
                  rotate: [-1, 1, 0],
                  boxShadow: '0 8px 30px rgba(236,72,153,0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                className='bg-white rounded-2xl p-4 shadow-sm border border-pink-100 text-center cursor-default'
              >
                <motion.div
                  className='text-2xl mb-1'
                  whileHover={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {icon}
                </motion.div>
                <div className='text-s text-pink-400 font-semibold mb-0.5'>
                  {label}
                </div>
                <div className='text-m text-gray-600 font-medium'>{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 좋아하는 것들 */}
      <section className='px-6 pb-10 relative z-10'>
        <div className='max-w-[1200px] mx-auto'>
          <motion.h2
            className='text-xl font-bold text-gray-700 mb-4 flex items-center gap-2'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span>💛</span> 제가 좋아하는 것들
          </motion.h2>

          {/* 야구 카드 */}
          <motion.div
            style={{ marginTop: '16px' }}
            className='bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 shadow-sm border border-red-200 overflow-hidden relative mb-4'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 12px 40px rgba(239,68,68,0.2)',
            }}
          >
            {/* 배경 장식 */}
            <motion.div
              className='absolute -right-6 -top-6 text-8xl opacity-10 pointer-events-none select-none'
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ⚾️
            </motion.div>

            <div className='flex items-center gap-2 mb-3'>
              <motion.span
                className='text-2xl'
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ⚾️
              </motion.span>
              <h3 className='text-lg font-bold text-red-700'>야구 시청</h3>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <div className='flex gap-3'>
                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/landers1.jpeg'
                    alt='landers1'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px] bg-white'
                  />
                </motion.div>

                <motion.div
                  className='w-[150px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0 bg-white'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/landers2.jpeg'
                    alt='landers2'
                    width={150}
                    height={200}
                    className='object-cover w-[150px] h-[200px] bg-white'
                  />
                </motion.div>

                <motion.div
                  className='w-[150px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/landers3.jpeg'
                    alt='landers3'
                    width={150}
                    height={200}
                    className='object-cover w-[150px] h-[200px] bg-white'
                  />{' '}
                </motion.div>
              </div>
              <p className='text-sm text-red-800 leading-relaxed text-center'>
                야구 보는 걸 좋아해요! SSG팬입니다
                <br />
                맛있는거 먹다가 시원하게 응원곡 부르는 맛이 있죠! 이기면 더
                좋구..
              </p>
            </div>
          </motion.div>

          {/* 포켓몬 카드 */}
          <motion.div
            className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 shadow-sm border border-purple-200 mb-4 overflow-hidden relative'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 12px 40px rgba(168,85,247,0.2)',
            }}
          >
            {/* 배경 장식 */}
            <motion.div
              className='absolute -right-6 -top-6 text-8xl opacity-10 pointer-events-none select-none'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              ⚡
            </motion.div>

            <div className='flex items-center gap-2 mb-3'>
              <motion.span
                className='text-2xl'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              <h3 className='text-lg font-bold text-purple-700'>포켓몬</h3>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <div className='flex gap-3'>
                <motion.div
                  className='w-[450px] h-[200px] rounded-xl overflow-hidden border-2 border-purple-300 bg-purple-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/pokopia1.jpeg'
                    alt='포켓몬1'
                    width={500}
                    height={300}
                    className='object-cover w-[500px] h-[300px]'
                  />
                </motion.div>

                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-purple-300 bg-purple-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/metamon2.jpeg'
                    alt='포켓몬2'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px]'
                  />
                </motion.div>

                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-purple-300 bg-purple-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/metamon1.jpeg'
                    alt='포켓몬3'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px]'
                  />
                </motion.div>
              </div>
              <p className='text-sm text-center text-purple-800 leading-relaxed'>
                포켓몬을 정말 좋아해요!
                <br />
                제일 좋아하는 포켓몬은 나몰빼미, 메타몽 입니다!
              </p>
            </div>
          </motion.div>

          {/* 치이카와 카드 */}
          <motion.div
            className='bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-2xl p-5 shadow-sm border border-pink-200 overflow-hidden relative'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 12px 40px rgba(236,72,153,0.2)',
            }}
          >
            {/* 배경 장식 */}
            <motion.div
              className='absolute -right-6 -top-6 text-8xl opacity-10 pointer-events-none select-none'
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              🐭
            </motion.div>

            <div className='flex items-center gap-2 mb-3'>
              <motion.span
                className='text-2xl'
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                🐭
              </motion.span>
              <h3 className='text-lg font-bold text-pink-700'>치이카와</h3>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <div className='flex gap-3'>
                <motion.div
                  className='w-[150px] h-[200px] rounded-xl overflow-hidden border-2 border-pink-300 bg-pink-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/chiikawa2.jpeg'
                    alt='chiikawa'
                    width={150}
                    height={200}
                    className='object-cover w-[150px] h-[200px]'
                  />
                </motion.div>

                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-pink-300 bg-pink-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/hachiwares.jpeg'
                    alt='hachiware'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px]'
                  />
                </motion.div>

                <motion.div
                  className='w-[150px] h-[200px] rounded-xl overflow-hidden border-2 border-pink-300 bg-pink-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/usagi.jpeg'
                    alt='usagi'
                    width={150}
                    height={200}
                    className='object-cover w-[150px] h-[200px]'
                  />
                </motion.div>
              </div>
              <p className='text-sm text-pink-800 leading-relaxed text-center'>
                치이카와 정말 귀엽죠?!
                <br />
                애니메이션을 보고 너무 힐링이 되서 너무 좋아해요..
                <br />
                나오는 캐릭터들 다 좋아합니다!
              </p>
            </div>
          </motion.div>

          {/* 게임 카드 */}
          <motion.div
            style={{ marginTop: '16px' }}
            className='bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 shadow-sm border border-red-200 overflow-hidden relative'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 12px 40px rgba(239,68,68,0.2)',
            }}
          >
            {/* 배경 장식 */}
            <motion.div
              className='absolute -right-6 -top-6 text-8xl opacity-10 pointer-events-none select-none'
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              🕹️
            </motion.div>

            <div className='flex items-center gap-2 mb-3'>
              <motion.span
                className='text-2xl'
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                🕹️
              </motion.span>
              <h3 className='text-lg font-bold text-red-700'>게임</h3>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-center'>
              <div className='flex gap-3'>
                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/pokemon.png'
                    alt='pokemon'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px] bg-white'
                  />
                </motion.div>

                <motion.div
                  className='w-[450px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0 bg-white'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/kirby.png'
                    alt='kirby'
                    width={450}
                    height={200}
                    className='object-cover w-[450px] h-[200px] bg-white'
                  />
                </motion.div>

                <motion.div
                  className='w-[300px] h-[200px] rounded-xl overflow-hidden border-2 border-red-300 bg-red-100 flex items-center justify-center shrink-0'
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src='/image/tetris.jpeg'
                    alt='tetris'
                    width={300}
                    height={200}
                    className='object-cover w-[300px] h-[200px] bg-white'
                  />{' '}
                </motion.div>
              </div>
              <p className='text-sm text-red-800 leading-relaxed text-center'>
                닌텐도 게임들 좋아합니다!
                <br />
                제일 좋아하는 시리즈는 포켓몬, 커비, 테트리스입니다!
                <br />
                잘은 못하지만 롤(럭스만..), 오버워치(라마트라, 모이라만..) 가끔
                하기도 해요!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 이번 학기 목표 */}
      <section className='px-6 pb-10 relative z-10'>
        <div className='max-w-[1200px] mx-auto'>
          <motion.h2
            className='text-xl font-bold text-gray-700 mb-4 flex items-center gap-2'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span>🎯</span> 이번 학기 목표
          </motion.h2>

          <motion.div
            className='bg-white rounded-2xl p-5 shadow-sm border border-pink-100 space-y-3'
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {['프론트 마스터하기!', '포트폴리오 잘 만들기!', '취업하기!'].map(
              (goal, i) => (
                <motion.div
                  key={i}
                  className='flex items-center gap-3'
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  whileHover={{ x: 6 }}
                >
                  <motion.span
                    className='w-7 h-7 rounded-full bg-pink-100 text-pink-500 font-bold text-sm flex items-center justify-center shrink-0'
                    whileHover={{ scale: 1.2, backgroundColor: '#f9a8d4' }}
                  >
                    {i + 1}
                  </motion.span>
                  <span className='text-gray-600 text-sm'>{goal}</span>
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* 마무리 */}
      <section className='px-6 pb-20 relative z-10'>
        <div className='max-w-[1200px] mx-auto'>
          <motion.div
            className='rounded-2xl p-6 text-center border border-pink-200 shadow-lg relative overflow-hidden'
            style={{ background: 'linear-gradient(135deg, #fce7f3, #ede9fe)' }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* 반짝이 배경 */}
            {['✨', '🌸', '💕', '🌟'].map((s, i) => (
              <motion.span
                key={i}
                className='absolute text-xl opacity-30 pointer-events-none select-none'
                style={{ top: `${20 + i * 20}%`, left: `${5 + i * 25}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              >
                {s}
              </motion.span>
            ))}

            <motion.p
              className='text-pink-600 font-semibold text-base relative z-10'
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              앞으로 잘 부탁드려요! 🌸
            </motion.p>
            <p className='text-pink-400 text-sm mt-1 relative z-10'>
              친하게 지내고 싶은 분은 언제든지 말 걸어주세요 😊
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
