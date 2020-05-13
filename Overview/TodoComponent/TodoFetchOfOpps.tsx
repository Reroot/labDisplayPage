import * as React from 'react';

interface ComponentNameProps {};

interface ComponentNameState {};

class ComponentName extends React.Component<ComponentNameProps, ComponentNameState> {
    public render(): JSX.Element {
        return (<span>ComponentName</span>);
    }
}

export default ComponentName;

