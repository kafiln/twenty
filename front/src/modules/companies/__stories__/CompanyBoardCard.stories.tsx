import { MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import { CompanyBoardCard } from '@/companies/components/CompanyBoardCard';
import { BoardCardDecorator } from '~/testing/decorators';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { getRenderWrapperForComponent } from '~/testing/renderWrappers';

const meta: Meta<typeof CompanyBoardCard> = {
  title: 'Modules/Companies/CompanyBoardCard',
  component: CompanyBoardCard,
  decorators: [BoardCardDecorator],
};

export default meta;
type Story = StoryObj<typeof CompanyBoardCard>;

const FakeSelectableCompanyBoardCard = () => {
  return (
    <MemoryRouter>
      <CompanyBoardCard />
    </MemoryRouter>
  );
};

export const CompanyCompanyBoardCard: Story = {
  render: getRenderWrapperForComponent(<FakeSelectableCompanyBoardCard />),
  parameters: {
    msw: graphqlMocks,
  },
};
