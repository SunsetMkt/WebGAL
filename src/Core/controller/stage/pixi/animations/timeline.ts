import { RUNTIME_GAMEPLAY } from '@/Core/runtime/gamePlay';
import { ITransform } from '@/store/stageInterface';
import { gsap } from 'gsap';

/**
 * 动画创建模板
 * @param timeline
 * @param targetKey 作用目标
 * @param duration 持续时间
 */
export function generateTimelineObj(
  timeline: Array<ITransform & { duration: number }>,
  targetKey: string,
  duration: number,
) {
  const target = RUNTIME_GAMEPLAY.pixiStage!.getStageObjByKey(targetKey);
  let gsapTimeline1: gsap.core.Timeline | null = gsap.timeline();
  let gsapTimeline2: gsap.core.Timeline | null = gsap.timeline();
  let gsapTimeline3: gsap.core.Timeline | null = gsap.timeline();
  let gsapTimeline4: gsap.core.Timeline | null = gsap.timeline();
  let gsapTimeline5: gsap.core.Timeline | null = gsap.timeline();
  const gsapTimelines = [gsapTimeline1, gsapTimeline2, gsapTimeline3, gsapTimeline4, gsapTimeline5];
  for (const gsapEffect of timeline) {
    if (target) {
      gsapTimeline1.to(target.pixiContainer, {
        alpha: gsapEffect.alpha,
        rotation: gsapEffect.rotation,
        duration: gsapEffect.duration,
      });
      gsapTimeline2.to(target.pixiContainer.scale, {
        ...gsapEffect.scale,
        duration: gsapEffect.duration,
      });
      gsapTimeline3.to(target.pixiContainer.position, {
        ...gsapEffect.position,
        duration: gsapEffect.duration,
      });
      gsapTimeline4.to(target.pixiContainer.pivot, {
        ...gsapEffect.pivot,
        duration: gsapEffect.duration,
      });
      // @ts-ignore
      // gsapTimeline5.to(target.pixiContainer.blurFilter, {
      //   ...gsapEffect.blurFilter,
      //   duration: gsapEffect.duration,
      // });
    }
  }

  /**
   * 在此书写为动画设置初态的操作
   */
  function setStartState() {
    console.log('set start');
    for (const gsaptimeline of gsapTimelines) {
      if (gsaptimeline) {
        gsaptimeline.seek(0);
      }
    }
  }

  /**
   * 在此书写为动画设置终态的操作
   */
  function setEndState() {
    console.log('set end');
    for (const gsaptimeline of gsapTimelines) {
      if (gsaptimeline) {
        gsaptimeline.seek(duration);
        // gsaptimeline.kill();
      }
    }
    // gsapTimeline1 = null;
    // gsapTimeline2 = null;
    // gsapTimeline3 = null;
    // gsapTimeline4 = null;
    // gsapTimeline5 = null;
  }

  /**
   * 在此书写动画每一帧执行的函数
   * @param delta
   */
  function tickerFunc(delta: number) {}

  return {
    setStartState,
    setEndState,
    tickerFunc,
  };
}
