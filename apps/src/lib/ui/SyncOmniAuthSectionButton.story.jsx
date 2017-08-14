import React from 'react';
import {OAuthSectionTypes} from "../../templates/teacherDashboard/shapes";
import {
  SyncOmniAuthSectionButton,
  READY, IN_PROGRESS, SUCCESS, FAILURE,
} from './SyncOmniAuthSectionButton';


export default storybook => {
  const stories = [];
  [OAuthSectionTypes.clever, OAuthSectionTypes.google_classroom].forEach(provider => {
    [READY, IN_PROGRESS, SUCCESS, FAILURE].forEach(buttonState => {
      stories.push({
        name: `Sync ${provider} - ${buttonState}`,
        story: () => (
          <SyncOmniAuthSectionButton
            provider={provider}
            buttonState={buttonState}
            onClick={storybook.action('click')}
          />
        ),
      });
    });
  });

  return storybook
    .storiesOf('SyncOmniAuthSectionButton', module)
    .addStoryTable(stories);
};
