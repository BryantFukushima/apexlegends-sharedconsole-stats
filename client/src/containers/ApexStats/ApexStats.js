import React, { Component } from 'react';
import * as styles from './ApexStats.module.scss'

import ApexStatsForm from './ApexStatsForm/ApexStatsForm';
class ApexStats extends Component {
    render() {
        return (
            <div className={styles.Apex}>
                <h1>Apex Legends: Shared Console Stats</h1>
                <ApexStatsForm />
            </div>
        )
    }
}

export default ApexStats;