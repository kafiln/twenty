import { useRecoilState } from 'recoil';

import { useSetHotkeyScope } from '@/ui/hotkey/hooks/useSetHotkeyScope';
import { useOpenRightDrawer } from '@/ui/right-drawer/hooks/useOpenRightDrawer';
import { RightDrawerHotkeyScope } from '@/ui/right-drawer/types/RightDrawerHotkeyScope';
import { RightDrawerPages } from '@/ui/right-drawer/types/RightDrawerPages';

import { commentableEntityArrayState } from '../states/commentableEntityArrayState';
import { CommentableEntity } from '../types/CommentableEntity';

// TODO: refactor with recoil callback to avoid rerender
export function useOpenTimelineRightDrawer() {
  const openRightDrawer = useOpenRightDrawer();
  const [, setCommentableEntityArray] = useRecoilState(
    commentableEntityArrayState,
  );
  const setHotkeyScope = useSetHotkeyScope();

  return function openTimelineRightDrawer(
    commentableEntityArray: CommentableEntity[],
  ) {
    setHotkeyScope(RightDrawerHotkeyScope.RightDrawer, { goto: false });
    setCommentableEntityArray(commentableEntityArray);
    openRightDrawer(RightDrawerPages.Timeline);
  };
}
