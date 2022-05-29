(() => {
  let yOffset = 0; //window.pageYOffset
  let prevScrollHeight = 0; // 지나친 스크롤섹션들의 스크롤 높이 합
  let currentScene = 0;
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let acc = 0.2;
  let delayedYOffset = 0;
  let rafId;
  let rafState;
  console.log(yOffset);

  const sceneInfo = [
    {
      //0
      type: "video",
      heightNum: 1,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        video: document.querySelector("#scroll-section-0 .video"),
      },
      values: {
        video_opacity: [1, 0, { start: 0.5, end: 1 }],
      },
    },

    {
      //1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },

    {
      //2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },

    {
      //3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function scrollLoop() {
    // 클라이언트가 보고 있는 스크롤섹션 확인하는 함수
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);

    console.log(prevScrollHeight);
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    let totlaScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {}
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    console.log(yOffset);

    scrollLoop();
  });
})();
