/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    ul: "ul",
    li: "li",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    a: "a",
    pre: "pre",
    code: "code"
  }, props.components), {Mermaid} = _components;
  if (!Mermaid) _missingContentReference("Mermaid", true);
  return <><_components.h1>{"Trusted Python Engineering at Hushh"}</_components.h1>{"\n"}<_components.p>{"Maintaining trusted deployments at Hushh are paramount. Here we dive into our best practices on one of our open source libraries"}</_components.p>{"\n"}<_components.p>{"Hushh utilizes cutting edge open source AI and ML libraries, and most AI startups out there will claim the same. However, Hushh’s emphasis on trust and security means that we also have to make these capabilities stable and safe. We will walk through some of the techniques we use to develop and deploy software, using our open source hushh catalog format as an example."}</_components.p>{"\n"}<_components.p>{"This post winds up being a long sequence of steps. You can follow along with the basic steps:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Local Development : Settings and configuration for personal machines"}</_components.li>{"\n"}<_components.li>{"CICD : Workflows and artifact configuration for testing and building"}</_components.li>{"\n"}<_components.li>{"PyPi : Configuration for secure publishing"}</_components.li>{"\n"}</_components.ul>{"\n"}<Mermaid chart={`
flowchart LR
    subgraph Local
        style Local fill:#d3d3ff, stroke:#333, stroke-width:2px
        A[Local Development]
        style B stroke:#999, fill:#eee
    end

    subgraph CICD
        style CICD fill:#FFFFF, stroke:#999
        B[build] ---> C[test] ---> D[deployment]
        style B stroke:#999, fill:#eee
        style C stroke:#999, fill:#eee
        style D stroke:#999, fill:#eee
    end

    subgraph PyPI
        E[Hosting]
        style E stroke:#999, fill:#eee
    end

    A --> B --> C --> D --> E
`} />{"\n"}<_components.p>{"We’ll go from left to right and start with local development."}</_components.p>{"\n"}<_components.h2>{"Local Development"}</_components.h2>{"\n"}<_components.h3>{"Stable AI/ML libraries with Conda"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"Many state of the art AI libraries are available in Python. However, Python is not typically used to write the core logic of these libraries. Instead, Python is simply a convenient wrapper around a series of low level C libraries that handle the tensor operations that constitute a neural network routine."}</_components.p>{"\n"}<_components.p>{"Adding to this complexity is the fact that many neural network libraries are not up to date with the latest Python version. For instance, the popular Pytorch library only recently supported Python 3.12, despite the version being available in "}<_components.a href="https://peps.python.org/pep-0693/">{"October of last year"}</_components.a>{"."}</_components.p>{"\n"}<_components.p>{"At Hushh we rely heavily on the work of "}<_components.a href="https://www.anaconda.com/">{"Anaconda"}</_components.a>{", including the open source "}<_components.a href="https://conda-forge.org/">{"conda forge"}</_components.a>{" packages. The Conda community maintains stable python distributions for AI/ML libraries, ensuring we have the most up to date and secure python environment possible for our services. For our open source projects we will provide an "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/environment.yml">{"environment.yml"}</_components.a>{" file that specifies how to set up the conda environment. The environment can typically be installed and activated with:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-yml">{"    $> conda env create -f environment.yml\n    $> conda activate hushh-vibe-catalog\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Environment Management with direnv"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"At Hushh, we have many different projects and Conda environments going at once. The projects may require different versions of libraries, or require other specific configuration. This can be a source of confusion when switching between them for development work. Luckily, a tool called "}<_components.a href="https://direnv.net/">{"direnv"}</_components.a>{" exists that enables us to switch between project environments as easily as switching between working directories."}</_components.p>{"\n"}<_components.p>{"To enable this functionality, "}<_components.a href="https://direnv.net/">{"direnv"}</_components.a>{" will refer to an .envrc file in the root of the working directory. You can see one of these in the Vibe Catalog library "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/.envrc">{"here"}</_components.a></_components.p>{"\n"}<_components.pre><_components.code className="language-yml">{"eval \"$(conda shell.zsh hook)\"\nconda activate hushh-vibe-catalog\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"When we enter the directory, we execute a simple conda shell.zsh hook to load the conda commands, and then we activate the Vibe Catalog conda environment. When we exit the directory, the environment is unloaded."}</_components.p>{"\n"}<_components.h3>{"PEP vs. Poetry"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"Within the Python ecosystem, there’s a host of frameworks that make it “easy” to do a number of different automated tasks. Tools like "}<_components.a href="https://python-poetry.org/">{"poetry"}</_components.a>{" make it easy to configure and publish libraries."}</_components.p>{"\n"}<_components.p>{"In the past, we’ve experimented with these frameworks and found that they’re truly an improvement over the antiquated and cludgy Python configuration systems that are offered out of the box. However, Python has modernized significantly in the past year or two, including supporting the new "}<_components.a href="https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/">{"pyproject.toml"}</_components.a>{" that greatly simplifies the specification of libraries, dependencies, and environments."}</_components.p>{"\n"}<_components.p>{"At this point, it’s clear to us that Python is a constantly evolving standard, and that frameworks that try to remove rough edges can quickly become technical debt as Python includes those features through more universally-accepted PEP standards."}</_components.p>{"\n"}<_components.p>{"So, our recommendation is to stick with basic vanilla Python-standards for packaging these days, and just try to keep your versions up to date :)"}</_components.p>{"\n"}<_components.h3>{"The Case for Good Makefiles"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"The Hushh Vibe Catalog uses a "}<_components.a href="https://en.wikipedia.org/wiki/Make_(software)">{"Make"}</_components.a>{" to handle a lot of additional functionality useful during development. The "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/Makefile">{"Makefile"}</_components.a>{" lists some common routines for creating, cleaning, and testing the package. Make is a common tool that’s readily available in most CICD contexts, and its nice to organize and run development jobs the same way on a local machine as they are run in CICD. There’s a number of different varieties of Make out there, but Python really is just fine with vanilla "}<span className="highlightMdx">{"make"}</span></_components.p>{"\n"}<_components.p>{"For instance, we use a special version of pytest that invokes code coverage testing. The specific command looks like:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"$> pytest --cov=python/src python/test\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"That can be difficult to remember to enter correctly, so we create a simple Makefile entry for it and can simply enter:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"$> make test\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"That command should always run the basic integration tests that can be expected to finish in a minute or two."}</_components.p>{"\n"}<_components.h2>{"Content Integration/Content Deployment"}</_components.h2>{"\n"}<Mermaid chart={`
flowchart LR
    subgraph Local
        A[Local Development]
        style A stroke:#999, fill:#eee
    end

    subgraph CICD
       style CICD fill:#d3d3ff, stroke:#333, stroke-width:2px
        B[build] ---> C[test] ---> D[deployment]
        style B  stroke:white, fill:white
        style C  stroke:white, fill:white
        style D  stroke:white, fill:white
    end

    subgraph PyPI
        E[Hosting]
        style E stroke:#999, fill:#eee

    end

    A --> B --> C --> D --> E

    classDef purple fill:#d3d3ff,stroke:#333,stroke-width:2px;
    classDef white fill:#ffffff,stroke:#333,stroke-width:2px;
    class one purple;
    class two,three white;
`} />{"\n"}<_components.h3>{"Testing And Building Python Libraries"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"We’re testing checkins using Github’s builtin CICD system, called Github Actions. This is turned on through some configuration that defines a workflow for builds and tests. You can see the Hushh Vibe Catalog’s CICD configuration here"}</_components.p>{"\n"}<_components.p>{"The configuration there is short, but somewhat complex. Here’s the current version:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-yml">{"name: Build\non: [push, pull_request, release]\npermissions:\n  contents: write\n  id-token: write\njobs:\n  test:\n    name: Test wheels on ${{ matrix.os }}\n    runs-on: ${{ matrix.os }}\n    strategy:\n      matrix:\n        # os: [ubuntu-20.04, windows-2019, macOS-11]\n        os: [ubuntu-20.04]\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0\n      - uses: actions/setup-python@v3\n        with:\n          python-version: '3.11'\n      - name : Run Tests\n        run : |\n          pip install \".[ci]\"\n          make test\n  release:\n    name: Create Github/Pypi Release\n    needs:\n      - test\n    if: github.event_name == 'push' && contains(github.ref, 'refs/tags/v')\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4.1.1\n      - uses: actions/setup-python@v5.0.0\n        with:\n          python-version: '3.11'\n      - name : Build library wheel\n        run : pip wheel --no-deps -w dist .\n      - name: Publish to Github Releases\n        uses: softprops/action-gh-release@v1\n      - name: Publish to Pypi\n        run: |\n          pip install twine\n          twine upload ./dist/* --verbose\n        env:\n          TWINE_USERNAME: ${{ secrets.TWINE_USERNAME }}\n          TWINE_PASSWORD: ${{ secrets.TWINE_PASSWORD }}\n      - uses: actions/upload-artifact@v3\n        with:\n          path: ./dist/*.whl\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"The configuration defines two different jobs: test, and release. The test job has a few steps that checks out the code, and sets up a python environment. The release job is interesting for two reasons. Firstly, it depends on the test phase, which means that the library has to pass tests before the release job runs. Secondly, it has the following line:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"if: github.event_name == 'push' && contains(github.ref, 'refs/tags/v')\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"This conditional statement means that the job only runs if the commit has a tag associated with it prefixed by “v”"}</_components.p>{"\n"}<_components.h3>{"Tagged, Versioned, and Released"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"The release job in the CICD config has a conditional command that causes it to only trigger when the github event is a push that contains a git tag (and the git tag should start with the letter “v”)"}</_components.p>{"\n"}<_components.p>{"Git tags are special markers for commits. They can mean any number of things, but one common use is to have them refer to checkpoints that correspond with releases. Having a tag against a version is a particularly good way of ensuring that a given release wheel can be rebuilt and reproduced identically. So, rather than upload the release using Github’s web interface, we’re using Github’s CICD system to build the release for us from a tag. All we need to do is make a tag like “v1.2.3”, and it will generate the corresponding version."}</_components.p>{"\n"}<_components.p>{"Version numbers are also a critical part of the release process. Hushh Vibe Catalog uses a "}<_components.a href="https://semver.org/">{"semantic versioning"}</_components.a>{"(semver) format for its version format, following a major/minor/patch number sequence. Minor and patch changes shouldn’t break compatibility, while major version numbers do."}</_components.p>{"\n"}<_components.p>{"It can be an annoyance to update versions appropriately across all the parts of the library package that need to be updated (e.g. in the code, the documentation, the configuration, etc.). Hushh Vibe Catalog uses "}<_components.a href="https://pypi.org/project/bump2version/">{"bump2version"}</_components.a>{". This utility keeps track of the current version in a config file "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/.bumpversion.cfg">{"like this one"}</_components.a>{". One can enter in a command like "}<span className="highlightMdx">{"bumpversion major"}</span>{" or "}<span className="highlightMdx">{"bumpversion"}</span>{" patch to increment the major/patch version of the library. When bump2version updates the version in the config, it also creates a commit that corresponds to the version change, "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/commit/886596831c755728ee1fd1a5026acbe91f6928d6">{"like this one"}</_components.a>{" It will also create a tag for the new version number."}</_components.p>{"\n"}<_components.p>{"With the tag, commit, and version number all specified, all we need to do is:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"git push --tags\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"And the version tag will pass into the CICD system, get picked up by the release job, and build and publish the new version for us."}</_components.p>{"\n"}<_components.h3>{"PyPi and Trusted Deployments"}</_components.h3>{"\n"}<_components.hr />{"\n"}<Mermaid chart={`
flowchart LR
    subgraph Local
        A[Local Development]
        style A stroke:#999, fill:#eee
    end

    subgraph CICD
        B[build] ---> C[test] ---> D[deployment]
        style B  stroke:#999, fill:#eee
        style C  stroke:#999, fill:#eee
        style D  stroke:#999, fill:#eee
    end

    subgraph PyPI
    style PyPI fill:#d3d3ff, stroke:#333, stroke-width:2px
        E[Hosting]
        style E stroke:white, fill:white

    end

    A --> B --> C --> D --> E

    classDef purple fill:#d3d3ff,stroke:#333,stroke-width:2px;
    classDef white fill:#ffffff,stroke:#333,stroke-width:2px;
    class one purple;
    class two,three white;
`} />{"\n"}<_components.p>{"Currently, the library is published to Pypi using a twine command."}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"- name: Publish to Pypi\n  run: |\n    pip install twine\n    twine upload ./dist/* --verbose\n  env:\n    TWINE_USERNAME: ${{ secrets.TWINE_USERNAME }}\n    TWINE_PASSWORD: ${{ secrets.TWINE_PASSWORD }}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"The twine command uses Github secrets to populate Pypi/Twine API token information into the username/password environment variables. These are used by twine to authenticate with the Pypi server and upload the Python wheel files. By using secrets for our API tokens, we ensure they’re never accidentally included in any code that we upload to Github, and keep the library safe from leaked credentials."}</_components.p>{"\n"}<_components.h3>{"Handling Security Vulnerabilities with pip-compile and dependabot"}</_components.h3>{"\n"}<_components.hr />{"\n"}<_components.p>{"One feature that Vanilla Python lacks currently is a way to easily track dependencies. As projects get more complicated, they tend to acquire different dependencies. The more dependencies a project gathers, the more likely it is that a security vulnerability will crop up, threatening the security of the overall system."}</_components.p>{"\n"}<_components.p>{"Typically, Python dependencies are listed in a “requirements.txt” file, which list the library and version depdencies used in the service. You can see the requirements file "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/requirements.txt">{"here"}</_components.a>{"."}</_components.p>{"\n"}<_components.p>{"The requirements file for hushh not only includes the full dependency list for the project, but also includes notes on which libraries depend on eachother. If a library has a security problem, it’s much easier to understand and track how this problem is spread within a given library, as well as across each project that your organization maintains."}</_components.p>{"\n"}<_components.p>{"Providing a requirements file enables Github’s dependabot infrastructure to monitor potential security issues with any of the listed libraries. Dependabot can even create PRs that recommend updates for your libraries that are easy to test. Github makes it easy to set this up for each project, provide you follow the "}<_components.a href="https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file">{"instructions"}</_components.a>{"."}</_components.p>{"\n"}<_components.p>{"Luckily, setting dependabot up for Python is pretty straightforward. The Hushh Vibe Catalog library has a very "}<_components.a href="https://github.com/hushh-labs/hushh-vibe-catalog/blob/main/.github/dependabot.yml">{"simple one"}</_components.a></_components.p>{"\n"}<_components.p>{"Generating the requirements.txt file with the dependency graph is possible with a utility called pip-compile, which is available through "}<_components.a href="https://pypi.org/project/pip-tools/">{"pip-tools"}</_components.a></_components.p>{"\n"}<_components.p>{"In order to generate the file, we just simply run:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"$> pip-compile .\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Conclusion"}</_components.h2>{"\n"}<_components.hr />{"\n"}<_components.p>{"Trusted Python development involves a number of steps that don’t fit neatly in “one size fits all” solution frameworks. We have listed here what we consider our “best in breed” approaches towards supporting rapid development with straightforward tools while adhering to best-practice Python PEP standards, combined with best-practice trust and security protocols. There’s a number of hoops to jump through for Python development, but luckily none of them are terribly difficult on their own."}</_components.p>{"\n"}<_components.p>{"If you have an interest in trusted Python development, or have questions/comments about any of the tools/techniques that we’ve described here, we’d love to "}<_components.a href="https://discord.com/invite/hpFweqj5">{"talk to you on Discord!"}</_components.a>{"."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}
function _missingContentReference(id: string, component: boolean) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

export const contentMeta = {
  "title": "Trusted Python Engineering at Hushh",
  "description": "Maintaining trusted deployments at Hushh are paramount. Here we dive into our best practices on one of our open source libraries",
  "image": "/blogs/python_Eng_with_hushh.png",
  "publishedAt": "March 7, 2024",
  "updatedAt": "March 20 2024",
  "author": "Justin Donaldson",
  "isPublished": true,
  "tags": [
    "python",
    "engineering",
    "open source"
  ]
};
export const contentHeadings = [
  {
    "text": "Local Development",
    "level": 2,
    "slug": "local-development"
  },
  {
    "text": "Stable AI/ML libraries with Conda",
    "level": 3,
    "slug": "stable-aiml-libraries-with-conda"
  },
  {
    "text": "Environment Management with direnv",
    "level": 3,
    "slug": "environment-management-with-direnv"
  },
  {
    "text": "PEP vs. Poetry",
    "level": 3,
    "slug": "pep-vs-poetry"
  },
  {
    "text": "The Case for Good Makefiles",
    "level": 3,
    "slug": "the-case-for-good-makefiles"
  },
  {
    "text": "Content Integration/Content Deployment",
    "level": 2,
    "slug": "content-integrationcontent-deployment"
  },
  {
    "text": "Testing And Building Python Libraries",
    "level": 3,
    "slug": "testing-and-building-python-libraries"
  },
  {
    "text": "Tagged, Versioned, and Released",
    "level": 3,
    "slug": "tagged-versioned-and-released"
  },
  {
    "text": "PyPi and Trusted Deployments",
    "level": 3,
    "slug": "pypi-and-trusted-deployments"
  },
  {
    "text": "Handling Security Vulnerabilities with pip-compile and dependabot",
    "level": 3,
    "slug": "handling-security-vulnerabilities-with-pip-compile-and-dependabot"
  },
  {
    "text": "Conclusion",
    "level": 2,
    "slug": "conclusion"
  }
];
export const contentPlainText = "Trusted Python Engineering at Hushh Maintaining trusted deployments at Hushh are paramount. Here we dive into our best practices on one of our open source libraries Hushh utilizes cutting edge open source AI and ML libraries, and most AI startups out there will claim the same. However, Hushh’s emphasis on trust and security means that we also have to make these capabilities stable and safe. We will walk through some of the techniques we use to develop and deploy software, using our open source hushh catalog format as an example. This post winds up being a long sequence of steps. You can follow along with the basic steps: Local Development : Settings and configuration for personal machines CICD : Workflows and artifact configuration for testing and building PyPi : Configuration for secure publishing We’ll go from left to right and start with local development. Local Development Stable AI/ML libraries with Conda Many state of the art AI libraries are available in Python. However, Python is not typically used to write the core logic of these libraries. Instead, Python is simply a convenient wrapper around a series of low level C libraries that handle the tensor operations that constitute a neural network routine. Adding to this complexity is the fact that many neural network libraries are not up to date with the latest Python version. For instance, the popular Pytorch library only recently supported Python 3.12, despite the version being available in October of last year. At Hushh we rely heavily on the work of Anaconda, including the open source conda forge packages. The Conda community maintains stable python distributions for AI/ML libraries, ensuring we have the most up to date and secure python environment possible for our services. For our open source projects we will provide an environment.yml file that specifies how to set up the conda environment. The environment can typically be installed and activated with: Environment Management with direnv At Hushh, we have many different projects and Conda environments going at once. The projects may require different versions of libraries, or require other specific configuration. This can be a source of confusion when switching between them for development work. Luckily, a tool called direnv exists that enables us to switch between project environments as easily as switching between working directories. To enable this functionality, direnv will refer to an .envrc file in the root of the working directory. You can see one of these in the Vibe Catalog library here When we enter the directory, we execute a simple conda shell.zsh hook to load the conda commands, and then we activate the Vibe Catalog conda environment. When we exit the directory, the environment is unloaded. PEP vs. Poetry Within the Python ecosystem, there’s a host of frameworks that make it “easy” to do a number of different automated tasks. Tools like poetry make it easy to configure and publish libraries. In the past, we’ve experimented with these frameworks and found that they’re truly an improvement over the antiquated and cludgy Python configuration systems that are offered out of the box. However, Python has modernized significantly in the past year or two, including supporting the new pyproject.toml that greatly simplifies the specification of libraries, dependencies, and environments. At this point, it’s clear to us that Python is a constantly evolving standard, and that frameworks that try to remove rough edges can quickly become technical debt as Python includes those features through more universally accepted PEP standards. So, our recommendation is to stick with basic vanilla Python standards for packaging these days, and just try to keep your versions up to date :) The Case for Good Makefiles The Hushh Vibe Catalog uses a Make) to handle a lot of additional functionality useful during development. The Makefile lists some common routines for creating, cleaning, and testing the package. Make is a common tool that’s readily available in most CICD contexts, and its nice to organize and run development jobs the same way on a local machine as they are run in CICD. There’s a number of different varieties of Make out there, but Python really is just fine with vanilla make For instance, we use a special version of pytest that invokes code coverage testing. The specific command looks like: That can be difficult to remember to enter correctly, so we create a simple Makefile entry for it and can simply enter: That command should always run the basic integration tests that can be expected to finish in a minute or two. Content Integration/Content Deployment Testing And Building Python Libraries We’re testing checkins using Github’s builtin CICD system, called Github Actions. This is turned on through some configuration that defines a workflow for builds and tests. You can see the Hushh Vibe Catalog’s CICD configuration here The configuration there is short, but somewhat complex. Here’s the current version: The configuration defines two different jobs: test, and release. The test job has a few steps that checks out the code, and sets up a python environment. The release job is interesting for two reasons. Firstly, it depends on the test phase, which means that the library has to pass tests before the release job runs. Secondly, it has the following line: This conditional statement means that the job only runs if the commit has a tag associated with it prefixed by “v” Tagged, Versioned, and Released The release job in the CICD config has a conditional command that causes it to only trigger when the github event is a push that contains a git tag (and the git tag should start with the letter “v”) Git tags are special markers for commits. They can mean any number of things, but one common use is to have them refer to checkpoints that correspond with releases. Having a tag against a version is a particularly good way of ensuring that a given release wheel can be rebuilt and reproduced identically. So, rather than upload the release using Github’s web interface, we’re using Github’s CICD system to build the release for us from a tag. All we need to do is make a tag like “v1.2.3”, and it will generate the corresponding version. Version numbers are also a critical part of the release process. Hushh Vibe Catalog uses a semantic versioning(semver) format for its version format, following a major/minor/patch number sequence. Minor and patch changes shouldn’t break compatibility, while major version numbers do. It can be an annoyance to update versions appropriately across all the parts of the library package that need to be updated (e.g. in the code, the documentation, the configuration, etc.). Hushh Vibe Catalog uses bump2version. This utility keeps track of the current version in a config file like this one. One can enter in a command like bumpversion major or bumpversion patch to increment the major/patch version of the library. When bump2version updates the version in the config, it also creates a commit that corresponds to the version change, like this one It will also create a tag for the new version number. With the tag, commit, and version number all specified, all we need to do is: And the version tag will pass into the CICD system, get picked up by the release job, and build and publish the new version for us. PyPi and Trusted Deployments Currently, the library is published to Pypi using a twine command. The twine command uses Github secrets to populate Pypi/Twine API token information into the username/password environment variables. These are used by twine to authenticate with the Pypi server and upload the Python wheel files. By using secrets for our API tokens, we ensure they’re never accidentally included in any code that we upload to Github, and keep the library safe from leaked credentials. Handling Security Vulnerabilities with pip compile and dependabot One feature that Vanilla Python lacks currently is a way to easily track dependencies. As projects get more complicated, they tend to acquire different dependencies. The more dependencies a project gathers, the more likely it is that a security vulnerability will crop up, threatening the security of the overall system. Typically, Python dependencies are listed in a “requirements.txt” file, which list the library and version depdencies used in the service. You can see the requirements file here. The requirements file for hushh not only includes the full dependency list for the project, but also includes notes on which libraries depend on eachother. If a library has a security problem, it’s much easier to understand and track how this problem is spread within a given library, as well as across each project that your organization maintains. Providing a requirements file enables Github’s dependabot infrastructure to monitor potential security issues with any of the listed libraries. Dependabot can even create PRs that recommend updates for your libraries that are easy to test. Github makes it easy to set this up for each project, provide you follow the instructions. Luckily, setting dependabot up for Python is pretty straightforward. The Hushh Vibe Catalog library has a very simple one Generating the requirements.txt file with the dependency graph is possible with a utility called pip compile, which is available through pip tools In order to generate the file, we just simply run: Conclusion Trusted Python development involves a number of steps that don’t fit neatly in “one size fits all” solution frameworks. We have listed here what we consider our “best in breed” approaches towards supporting rapid development with straightforward tools while adhering to best practice Python PEP standards, combined with best practice trust and security protocols. There’s a number of hoops to jump through for Python development, but luckily none of them are terribly difficult on their own. If you have an interest in trusted Python development, or have questions/comments about any of the tools/techniques that we’ve described here, we’d love to talk to you on Discord!.";
