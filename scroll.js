(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const sceneInfo = [
    {
      // 0
      type: "video",
      heightNum: 1.5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        video: document.querySelector("#scroll-section-0 .video"),
        message: document.querySelector("#scroll-section-0 .main-message"),
      },
      values: {
        video_opacity: [1, 0, { start: 0.25, end: 0.7 }],
        message_opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
        message_opacity_out: [1, 0, { start: 0.8, end: 0.95 }],
      },
    },
    {
      // 1
      type: "sticky",
      heightNum: 6, // type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
        thumbnail: document.querySelector("#scroll-section-1 .thumbnail"),
        partnersA: document.querySelector("#scroll-section-1 .partnersA"),
        partnersB: document.querySelector("#scroll-section-1 .partnersB"),
      },
      values: {
        videoImageCount: 456,
        imageSequence: [0, 455],
        thumbnail_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        thumbnail_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        partnersA_opacity_in: [0, 1, { start: 0.55, end: 0.65 }],
        partnersA_opacity_out: [1, 0, { start: 0.82, end: 0.92 }],
        partnersB_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
        partnersB_opacity_out: [1, 0, { start: 0.82, end: 0.92 }],
      },
    },
    {
      // 2
      type: "normal",
      // heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        content: document.querySelector("#scroll-section-2 .contact"),
      },
    },
  ];

  function setCanvasImages() {
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `./assets/image/${1035 + i}.JPEG`;
      sceneInfo[1].objs.videoImages.push(imgElem);
    }
  }

  setCanvasImages();

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky" || sceneInfo[i].type === "video") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight =
          sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 1;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 830;
    sceneInfo[1].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        const video_opacity = calcValues(values.video_opacity, currentYOffset);
        objs.video.style.opacity = video_opacity;

        if (scrollRatio <= 0.7) {
          // in
          objs.message.style.opacity = calcValues(
            values.message_opacity_in,
            currentYOffset
          );
        } else {
          // out
          objs.message.style.opacity = calcValues(
            values.message_opacity_out,
            currentYOffset
          );
        }

        break;

      case 1:
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);

        if (scrollRatio <= 0.27) {
          // in
          objs.thumbnail.style.opacity = calcValues(
            values.thumbnail_opacity_in,
            currentYOffset
          );
        } else {
          // out
          objs.thumbnail.style.opacity = calcValues(
            values.thumbnail_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.75) {
          // in
          objs.partnersA.style.opacity = calcValues(
            values.partnersA_opacity_in,
            currentYOffset
          );
        } else {
          // out
          objs.partnersA.style.opacity = calcValues(
            values.partnersA_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.75) {
          // in
          objs.partnersB.style.opacity = calcValues(
            values.partnersB_opacity_in,
            currentYOffset
          );
        } else {
          // out
          objs.partnersB.style.opacity = calcValues(
            values.partnersB_opacity_out,
            currentYOffset
          );
        }

        break;

      // case 3:
      //   // console.log('3 play');
      //   let step = 0;
      //   // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
      //   const widthRatio = window.innerWidth / objs.canvas.width;
      //   const heightRatio = window.innerHeight / objs.canvas.height;
      //   let canvasScaleRatio;

      //   if (widthRatio <= heightRatio) {
      //     // 캔버스보다 브라우저 창이 홀쭉한 경우
      //     canvasScaleRatio = heightRatio;
      //   } else {
      //     // 캔버스보다 브라우저 창이 납작한 경우
      //     canvasScaleRatio = widthRatio;
      //   }

      //   objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
      //   objs.context.fillStyle = "white";
      //   objs.context.drawImage(objs.images[0], 0, 0);

      //   // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
      //   const recalculatedInnerWidth =
      //     document.body.offsetWidth / canvasScaleRatio;
      //   const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

      //   if (!values.rectStartY) {
      //     // values.rectStartY = objs.canvas.getBoundingClientRect().top;
      //     values.rectStartY =
      //       objs.canvas.offsetTop +
      //       (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
      //     values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
      //     values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
      //     values.rect1X[2].end = values.rectStartY / scrollHeight;
      //     values.rect2X[2].end = values.rectStartY / scrollHeight;
      //   }

      //   const whiteRectWidth = recalculatedInnerWidth * 0.15;
      //   values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
      //   values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
      //   values.rect2X[0] =
      //     values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
      //   values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

      //   // 좌우 흰색 박스 그리기
      //   objs.context.fillRect(
      //     parseInt(calcValues(values.rect1X, currentYOffset)),
      //     0,
      //     parseInt(whiteRectWidth),
      //     objs.canvas.height
      //   );
      //   objs.context.fillRect(
      //     parseInt(calcValues(values.rect2X, currentYOffset)),
      //     0,
      //     parseInt(whiteRectWidth),
      //     objs.canvas.height
      //   );

      //   if (scrollRatio < values.rect1X[2].end) {
      //     step = 1;
      //     // console.log('캔버스 닿기 전');
      //     objs.canvas.classList.remove("sticky");
      //   } else {
      //     step = 2;
      //     // console.log('캔버스 닿은 후');
      //     // 이미지 블렌드
      //     // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
      //     values.blendHeight[0] = 0;
      //     values.blendHeight[1] = objs.canvas.height;
      //     values.blendHeight[2].start = values.rect1X[2].end;
      //     values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
      //     const blendHeight = calcValues(values.blendHeight, currentYOffset);

      //     objs.context.drawImage(
      //       objs.images[1],
      //       0,
      //       objs.canvas.height - blendHeight,
      //       objs.canvas.width,
      //       blendHeight,
      //       0,
      //       objs.canvas.height - blendHeight,
      //       objs.canvas.width,
      //       blendHeight
      //     );

      //     objs.canvas.classList.add("sticky");
      //     objs.canvas.style.top = `${
      //       -(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
      //     }px`;

      //     if (scrollRatio > values.blendHeight[2].end) {
      //       values.canvas_scale[0] = canvasScaleRatio;
      //       values.canvas_scale[1] =
      //         document.body.offsetWidth / (1.5 * objs.canvas.width);
      //       values.canvas_scale[2].start = values.blendHeight[2].end;
      //       values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

      //       objs.canvas.style.transform = `scale(${calcValues(
      //         values.canvas_scale,
      //         currentYOffset
      //       )})`;
      //       objs.canvas.style.marginTop = 0;
      //     }

      //     if (
      //       scrollRatio > values.canvas_scale[2].end &&
      //       values.canvas_scale[2].end > 0
      //     ) {
      //       objs.canvas.classList.remove("sticky");
      //       objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

      //       values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
      //       values.canvasCaption_opacity[2].end =
      //         values.canvasCaption_opacity[2].start + 0.1;
      //       values.canvasCaption_translateY[2].start =
      //         values.canvasCaption_opacity[2].start;
      //       values.canvasCaption_translateY[2].end =
      //         values.canvasCaption_opacity[2].end;
      //       objs.canvasCaption.style.opacity = calcValues(
      //         values.canvasCaption_opacity,
      //         currentYOffset
      //       );
      //       objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
      //         values.canvasCaption_translateY,
      //         currentYOffset
      //       )}%, 0)`;
      //     } else {
      //       objs.canvasCaption.style.opacity = values.canvasCaption_opacity[0];
      //     }
      //   }

      //   break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      document.body.classList.remove("scroll-effect-end");
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      if (currentScene === sceneInfo.length - 1) {
        document.body.classList.add("scroll-effect-end");
      }
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
    playAnimation();
  }
  // function scrollLoop() {
  //   // 클라이언트가 보고 있는 스크롤섹션 확인하는 함수
  //   prevScrollHeight = 0;
  //   for (let i = 0; i < currentScene; i++) {
  //     prevScrollHeight += sceneInfo[i].scrollHeight;
  //   }

  //   if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
  //     currentScene++;
  //   }

  //   if (yOffset < prevScrollHeight) {
  //     if (currentScene === 0) return;
  //     currentScene--;
  //   }

  //   document.body.setAttribute("id", `show-scene-${currentScene}`);

  //   console.log(prevScrollHeight);
  //   console.log(currentScene);
  // }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      if (currentScene === 0 || currentScene === 2) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
      sceneInfo[0].objs.canvas.style.opacity = 1;
      sceneInfo[0].objs.context.drawImage(
        sceneInfo[0].objs.videoImages[0],
        0,
        0
      );
    }
    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if (document.body.offsetHeight - window.innerHeight - delayedYOffset < 1) {
      let tempYOffset = yOffset;
      scrollTo(0, tempYOffset - 1);
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
    document.body.classList.remove("before-load");
    setLayout();
    // sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        window.location.reload();
      }
    });

    window.addEventListener("orientationchange", () => {
      scrollTo(0, 0);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });

    // document
    //   .querySelector(".loading")
    //   .addEventListener("transitionend", (e) => {
    //     document.body.removeChild(e.currentTarget);
    //   });
  });
  window.addEventListener("resize", setLayout);

  // setCanvasImages();
})();
