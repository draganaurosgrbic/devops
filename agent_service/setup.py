from setuptools import setup

__version__ = "1.5.0"

with open('requirements.txt') as file:
    requirements = list(filter(lambda x: x, [line.strip() for line in file.readlines()]))

setup(
    name="devops_agent_service_project_2022",
    version=__version__,
    packages=['agent_service'],
    install_requires=requirements
)
