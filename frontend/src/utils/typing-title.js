  // const printTitle = (title) => {
  //   if(idx == title.length) {
  //     deleteTitle(title);
  //   } else if(idx < title.length) {
  //     setTimeout(() => {
  //       setDynamicTitle(dynamicTitle += title[idx]);
  //       idx += 1;
  //       printTitle(title);
  //     }, 500);
  //   }
  // }

  // const deleteTitle = (title) => {
  //   if(idx > 1) {
  //     setTimeout(() => {
  //       setDynamicTitle(dynamicTitle = dynamicTitle.slice(0, idx));
  //       idx -= 1;
  //       deleteTitle(title);
  //     }, 300);
  //   }else if(idx == 1){
  //     setTimeout(() => {
  //       setDynamicTitle(dynamicTitle = dynamicTitle.slice(0, idx));
  //       printTitle(title);
  //     }, 500);
  //   }
  // }