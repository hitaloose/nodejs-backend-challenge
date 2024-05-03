export const adaptController = (controller: { handle: any }) => {
  return controller.handle.bind(controller);
};
