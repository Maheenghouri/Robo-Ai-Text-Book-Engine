import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import type ContentType from '@theme/DocItem/Content';
import PersonalizeButton from '@site/src/components/PersonalizeButton';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
    return (
        <>
            <PersonalizeButton />
            <Content {...props} />
        </>
    );
}
