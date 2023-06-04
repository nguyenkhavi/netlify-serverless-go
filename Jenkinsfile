pipeline {
    agent { node { label 'master' } }
    environment {
        PROJECT_NAME='fleamint'
        VAULT_URL="https://vault.spiritlabs.co"
        master_docker_server = 'unix:///var/run/docker.sock'
    }
    stages {
        stage("prepare"){
            steps {
                    script {
                        slackSend   channel: "#deploy-notification", message: 
"""
@here
Job name: `${env.JOB_NAME}`
Build status: `START BUILD`
Build details: <${env.BUILD_URL}/display/redirect|See in web console>
"""
                    }
                }
        }
        stage("Parallel build"){
            parallel {
                stage('build') {
                    environment {
                        BRANCH = "$env.BRANCH_NAME"
                    }
                    steps {
                        script {
                            docker.withServer(master_docker_server) {
                                withCredentials([
                                    sshUserPrivateKey(credentialsId:'jenkins-master-ssh-credential' , keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName'),
                                    string(credentialsId: 'vault-token', variable: 'VAULT_TOKEN')
                                ]) {
                                    sh '''
                                    scripts/get-env.sh $VAULT_TOKEN $VAULT_URL $BRANCH &&
                                    pnpm i && pnpm run generate &&
                                    pnpm nx affected:build --base=origin/$BRANCH~1 --head=origin/$BRANCH
                                    '''
                                    docker.build("$PROJECT_NAME:landing-$BRANCH", "-f apps/landing/Dockerfile .")
                                }

                            }
                        }
                    }
                }
            }
        }

        stage("deploy"){
            parallel {
                stage('deploy-dev'){
                    steps{
                        script {
                            withCredentials([
                                sshUserPrivateKey(credentialsId:'jenkins-master-ssh-credential' , keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName'),
                                string(credentialsId: 'vault-token', variable: 'VAULT_TOKEN')
                            ]) {
                                sh '''
                                ssh -i $identity dong@localhost \"cd /home/dong/code/fleamint && docker compose up --force-recreate -d landing\"
                                '''
                            }
                        }
                    }
                }
            }
        }
}

    post {
        always {
            script {
                def color="danger"
                if (currentBuild.result=="SUCCESS") {
                    color = "good"
                }
                slackSend   channel: "#deploy-notification", color: color, message: 
"""
@here
Job name: `${env.JOB_NAME}`
Build status: `${currentBuild.result}`
Build details: <${env.BUILD_URL}/display/redirect|See in web console>
"""
            }
        }
    }
} 




