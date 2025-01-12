import { useEffect, useState } from 'react';

import { EditableCellChip } from '@/ui/table/editable-cell/types/EditableChip';
import {
  GetCompaniesQuery,
  useUpdateCompanyMutation,
} from '~/generated/graphql';
import { getLogoUrlFromDomainName } from '~/utils';

import { CompanyChip } from './CompanyChip';

type OwnProps = {
  company: Pick<
    GetCompaniesQuery['companies'][0],
    'id' | 'name' | 'domainName' | '_commentThreadCount'
  >;
};

export function CompanyEditableNameChipCell({ company }: OwnProps) {
  const [updateCompany] = useUpdateCompanyMutation();

  const [internalValue, setInternalValue] = useState(company.name ?? '');

  useEffect(() => {
    setInternalValue(company.name ?? '');
  }, [company.name]);

  return (
    <EditableCellChip
      value={internalValue}
      placeholder="Name"
      changeHandler={setInternalValue}
      ChipComponent={
        <CompanyChip
          id={company.id}
          name={company.name}
          clickable
          picture={getLogoUrlFromDomainName(company.domainName)}
        />
      }
      onSubmit={() =>
        updateCompany({
          variables: {
            id: company.id,
            name: internalValue,
          },
        })
      }
      onCancel={() => setInternalValue(company.name ?? '')}
    />
  );
}
