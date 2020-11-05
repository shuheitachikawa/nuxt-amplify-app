import Vue from 'vue'
import Amplify from 'aws-amplify'
import awsconfig from '@/src/aws-exports'
Amplify.configure(awsconfig)
Vue.use(Amplify)
