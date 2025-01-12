import { DateTime } from 'luxon';
import { useRecoilValue } from 'recoil';

import { companyCreatedAtFamilyState } from '@/companies/states/companyCreatedAtFamilyState';
import { EditableCellDate } from '@/ui/table/editable-cell/types/EditableCellDate';
import { useCurrentRowEntityId } from '@/ui/table/hooks/useCurrentEntityId';
import { useUpdateCompanyMutation } from '~/generated/graphql';

export function EditableCompanyCreatedAtCell() {
  const currentRowEntityId = useCurrentRowEntityId();

  const createdAt = useRecoilValue(
    companyCreatedAtFamilyState(currentRowEntityId ?? ''),
  );

  const [updateCompany] = useUpdateCompanyMutation();

  return (
    <EditableCellDate
      onChange={async (newDate: Date) => {
        if (!currentRowEntityId) return;

        await updateCompany({
          variables: {
            id: currentRowEntityId,
            createdAt: newDate.toISOString(),
          },
        });
      }}
      value={createdAt ? DateTime.fromISO(createdAt).toJSDate() : new Date()}
    />
  );
}
