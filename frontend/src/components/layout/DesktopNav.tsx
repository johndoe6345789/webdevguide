'use client';

import DesktopNavButtons from './DesktopNavButtons';
import MorePopover from './MorePopover';

interface Props {
  t: (key: string) => string;
  moreAnchor: HTMLElement | null;
  onMoreOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onMoreClose: () => void;
}

export default function DesktopNav(
  { t, moreAnchor, onMoreOpen, onMoreClose }: Props,
) {
  return (
    <>
      <DesktopNavButtons t={t} onMoreOpen={onMoreOpen} />
      <MorePopover t={t} anchorEl={moreAnchor} onClose={onMoreClose} />
    </>
  );
}
