pipeline { 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build dokcer image'
                sh ''' docker image build -t onestopmedishop-admin .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deployz ment phase ----------'
                sh '''
                (if  [ $(docker ps -a | grep onestopmedishop-admin-container | cut -d " " -f1) ]; then \
                        echo $(docker rm -f onestopmedishop-admin-container); \
                        echo "---------------- successfully removed onestopmedishop-admin-container ----------------"
                    else \
                    echo OK; \
                fi;);
                docker container run --network onestopmedishop-web-network --restart always --name onestopmedishop-admin-container -p 4201:80 -d onestopmedishop-admin
            '''
            }
        }
    }
}